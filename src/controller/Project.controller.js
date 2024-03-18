const ProjectRespository = require('../reponsitories/Project.repository');
const BaseController = require('./Base.controller');
const Project = require('../models/project.model');
const Account = require('../models/account.model');
const Task = require('../models/task.model');
class ProjectController extends BaseController {
  constructor() {
    super(ProjectRespository);
  }
  async activeProject(req, res) {
    const { account_id, project_id } = req.body;
    const account = await Account.findById(account_id)
    console.log(account.role);
    if (account.role !== 'Leader') {
      return res.status(403).json({ error: 'Account does not have leader role' });
    }
    const project = await Project.findById(project_id);
    if (!project.leader && project.status === 'Unconfirmed') {
      project.leader = account_id;
      project.status = 'Confirmed';
      await project.save();
    }
    return res.status(201).json({ message: 'Project confirmed' });
  }
  async addMember(req, res) {
    const { account_id, project_id } = req.body;
    const account = await Account.findById(account_id);
    if (!account || account.role !== 'Employee') {
      return res.status(203).json({ error: 'Account does not have employee role or does not exist' });
    }
    if (account.status === 'Busy') {
      return res.status(203).json({ error: 'Account is Busy' });
    }
    // const checkEmployee = await Project.findOne({ status: 'Complete', members: account_id });  
    const checkEmployee2 = await Project.findOne({ members: account_id });
    if (checkEmployee2 && checkEmployee2.status !== 'Complete') {
      return res.status(203).json({ error: 'Account is a member of a project' });
    }
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(204).json({ error: 'Project not found' });
    }
    if (project.status === 'Complete') {
      return res.status(203).json({ error: 'Project is complete' });
    }
    if (project.members.includes(account_id)) {
      return res.status(203).json({ error: 'Account is already a member of this project' });
    }
    if (project.status === 'Confirmed') {
      await project.updateOne({ status: "Processing" });
    }
    await project.updateOne(
      { $push: { members: account_id } },
    );
    await account.updateOne({ status: 'Busy' });

    return res.status(201).json({ message: 'Add Member Success' });
  }
  async findById(req, res) {
    const { id } = req.params;
    const project = await Project.findById(id).populate('leader').populate('members');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json({ data: project });
  }
  async findByIdMember(req, res) {
    const { id } = req.params;
    const project = await Project.findOne({ members: id });
    if (!project) {
      return res.status(404).json({ error: 'Not have any project have memberID' });
    }
    return res.status(200).json({ data: project });
  }
  async getProjectPopulate(req, res) {
    const projects = await Project.find({}).populate('leader').populate('members');
    return res.status(200).json({ data: projects });
  }
  async completeProject(req, res) {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(204).json({ error: 'Project not found' });
    }
    if (project.status === 'Complete') {
      return res.status(205).json({ error: 'Project is already complete' });
    }
    const tasks = await Task.find({ project_id: id });
    const allTasksComplete = tasks.every(task => task.status === 'Complete');
    if (!allTasksComplete) {
      return res.status(203).json({ error: 'Not all tasks are complete' });
    }
    await project.updateOne({ status: 'Complete' });
    for (let member of project.members) {
      await Account.updateOne({ _id: member._id }, { status: 'Ready' });
    }
    return res.status(201).json({ message: 'Project completed and all members are ready' });
  }
  async kickMemberFormProject(req, res) {
    const { account_id, project_id } = req.body;
    const account = await Account.findById(account_id);
    if (!account) {
      return res.status(204).json({ error: 'Account not found' });
    }
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(204).json({ error: 'Project not found' });
    }
    const tasksByMember = await Task.find({ project_id: project_id, account_id: account_id });
    if (tasksByMember.some(task => task.status === 'Processing' || task.status === 'Wait to Confirmed')) {
      return res.status(203).json({ error: 'Employee have task not complete' });
    }
    if (!project.members.includes(account_id)) {
      return res.status(203).json({ error: 'Employee is not a member of this project' });
    }
    if (project.status === 'Complete') {
      return res.status(203).json({ error: 'Cannot kick member from Complete project' });
    }
    await project.updateOne({ $pull: { members: account_id } });
    await account.updateOne({ status: 'Ready' });
    return res.status(201).json({ message: 'Member Out Project' });
  }
}

module.exports = new ProjectController();
