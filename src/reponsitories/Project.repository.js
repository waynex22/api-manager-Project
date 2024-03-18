const BaseRepository = require('./Base.repository')
const project = require('../models/project.model')

class ProjectRepository extends BaseRepository {
    constructor(){
        super(project)
    }
}

module.exports = ProjectRepository