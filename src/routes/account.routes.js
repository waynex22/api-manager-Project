const express = require('express')
const AccountController = require('../controller/Account.controller')
const { authenticateToken, checkRole} = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/', AccountController.getAll)
router.get('/:id', AccountController.getById)
router.post('/add',authenticateToken, checkRole('Manager'), AccountController.register)
router.post('/login', AccountController.login)
router.post('/user', AccountController.user)
router.post('/changePassword', AccountController.changePassword)
router.put('/update/:id', authenticateToken, checkRole('Manager'),AccountController.update)
router.delete('/delete/:id', authenticateToken, checkRole('Manager'),AccountController.delete)
module.exports = router 