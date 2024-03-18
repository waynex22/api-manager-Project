class BaseController {
    constructor(repoClass){
        this.repo = new repoClass()
    }
    created(res, data){
        return res.status(201).json({message: 'created' , data: data})
    }
    updated(res , data){
        return res.status(201).json({message: 'updated', data: data})
    }
    internalServerError(res, err){
        return res.status(500).json({message: 'server error'})
    }
    ok(res, data){
        if(!!data){
            return res.status(200).json(data)
        }else{
            return res.status(200).send({message: 'ok', data: data})
        }
    }
    getAll = (req, res) => {
        this.repo.findAll().then(data => {
            return this.ok(res, data)
        }).catch(err => {
            return this.internalServerError(res, err)
        })
    }
    add = (req, res) => {
        const body = req.body
        this.repo.create(body).then(data => {
            return this.created(res, data)
        }).catch(err => {
            return this.internalServerError(res, err)
        })
    }
    update = (req, res) => {
        const id = req.params.id
        const body = req.body
        this.repo.update( id, body).then(data => {
            return this.updated(res,data)
        }).catch(err => {
            return this.internalServerError(res, err)
        })
    }
    delete = (req, res) => {
        const id = req.params.id
        this.repo.deleteById(id).then(data => {
            return this.ok(res, data)
        }).catch(err => {
            return this.internalServerError(res, err)
        })
    }
    getById = (req, res) => {
        const id = req.params.id
        this.repo.findById(id).then(data => {
            return this.ok(res, data)
        }).catch(err => {
            return this.internalServerError(res, err)
        })
    }
}

module.exports =  BaseController