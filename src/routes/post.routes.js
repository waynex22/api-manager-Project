const express = require('express')
const router = express.Router()
const PostController = require('../controller/Post.controller')

router.get('/', PostController.getAll)
router.get('/:id', PostController.getById)
router.post('/add',PostController.add)
router.put('/update/:id', PostController.updatePost)
router.delete('/delete/:id', PostController.delete)
module.exports = router;