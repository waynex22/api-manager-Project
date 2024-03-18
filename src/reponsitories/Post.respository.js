const BaseRepository = require('./Base.repository')
const post = require('../models/post.model')

class PostRepository extends BaseRepository {
    constructor(){
        super(post)
    }
}

module.exports = PostRepository