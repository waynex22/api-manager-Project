const BaseRepository = require('./Base.repository')
const task = require('../models/task.model')

class TaskRepository extends BaseRepository {
    constructor(){
        super(task)
    }
}

module.exports = TaskRepository