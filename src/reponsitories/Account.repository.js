const BaseRepository = require('./Base.repository')
const account = require('../models/account.model')

class AccountRepository extends BaseRepository {
    constructor(){
        super(account)
    }
}

module.exports = AccountRepository