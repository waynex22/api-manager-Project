const TaskRepository = require('../reponsitories/Task.repository');
const BaseController = require('./Base.controller');
const Task = require('../models/task.model');
const Project = require('../models/project.model');
const Account = require('../models/account.model');
class TaskController extends BaseController {
  constructor() {
    super(TaskRepository);
  }
  async addTask(req, res) {
    const { project_id, account_id, leader_id, name, description, dead_line } = req.body;
    const project = await Project.findById(project_id);
    if (!project.members.includes(account_id)) {
      return res.status(207).json({ error: 'Account is not a member of the project' });
    }
    if (project.status === 'Complete') {
      return res.status(207).json({ error: 'Project is completed' });
    }
    const task = await Task.create({ project_id, account_id, leader_id, name, description, dead_line });
    return res.status(201).json({ message: 'Task created', data: task });
  }
  async getAllTask(req, res) {
    const tasks = await Task.find({}).populate('account_id').populate('leader_id').populate('project_id');
    return res.status(200).json({ data: tasks });
  }
  async completeTask(req, res) {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.status === 'Complete') {
      return res.status(400).json({ error: 'Task is already completed' });
    }
    await task.updateOne({ status: 'Complete' });
    res.status(201).json({ message: 'Task completed' });
  }
  async getTaskByIdAndPopulate(req, res) {
    const { id } = req.params;
    const task = await Task.findById(id).populate('account_id').populate('leader_id').populate('project_id');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json({ data: task });
  }
  async sendTaskForLeader(req, res) {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.status === 'Complete') {
      return res.status(400).json({ error: 'Task is already completed' });
    }
    if (task.status === 'Wait to Confirmed') {
      return res.status(400).json({ error: 'Task is already sent to leader' });
    }
    await task.updateOne({ status: 'Wait to Confirmed' });
  }
  async getTaskByIdProject(req, res) {
    const { id } = req.params;
    const tasks = await Task.find({ project_id: id }).populate('account_id').populate('leader_id').populate('project_id');
    if (!tasks || tasks.length === 0) {
      return res.status(204).json({ error: 'No tasks found for this project' });
    }
    return res.status(200).json({ data: tasks });
  }
  async swapTask(req,res){
    const {taskId , projectId ,oldEmployeeId, newEmployeeId } = req.body;
    const project = await Project.findById(projectId);
    if (!project.members.includes(newEmployeeId)) {
      return res.status(207).json({ error: 'New employee is not a member of the project' });
    }
    if(project.status === 'Complete'){
      return res.status(207).json({ error: 'Project is completed' });
    }
    const oldEmployee = await Account.findById(oldEmployeeId);
    const newEmployee = await Account.findById(newEmployeeId);
    if(newEmployee.role !== 'Employee'){
      return res.status(207).json({ error: 'New employee is not a role Employee' });
    }
    if(newEmployee.status === 'Off'){
      return res.status(207).json({ error: 'Employee Not Working' });
    }

    if(newEmployee.department !==  oldEmployee.department){
      return res.status(207).json({ error: 'Employee is not in the same department' });
    }
    const task = await Task.findById(taskId);
    if(task.status === 'Complete'){
      return res.status(207).json({ error: 'Task is already completed' });
    }
    const checkNewEmployee = await Task.findOne({account_id:newEmployeeId, status:{$ne:'Complete'}});
    if(checkNewEmployee){
      return res.status(207).json({ error: 'New employee is working on another task' });
    }
    await task.updateOne({account_id:newEmployeeId});
    return res.status(201).json({ message: 'Task swapped' });
  }
}

module.exports = new TaskController();
