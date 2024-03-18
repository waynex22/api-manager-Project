const PostRepository = require('../reponsitories/Post.respository');
const BaseController = require('./Base.controller');
const Post = require('../models/post.model');
class PostController extends BaseController {
  constructor() {
    super(PostRepository);
  }
  async updatePost(req, res) {
    const id = req.params.id;
    const body = req.body;
    const data = await Post.findByIdAndUpdate(id, body, { new: true });
    return res.status(201).json({message: 'updated', data: data});
  }
}

module.exports = new PostController();
