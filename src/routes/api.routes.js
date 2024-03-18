const accountRouter = require('./account.routes')
const projectRouter = require('./project.routes')
const taskRouter = require('./task.routes')
const postRouter = require('./post.routes')
const route = (app) => {
     app.use('/api/v2/account', accountRouter)
     app.use('/api/v2/project', projectRouter)
     app.use('/api/v2/task', taskRouter)
     app.use('/api/v2/post', postRouter)
}
module.exports = route 