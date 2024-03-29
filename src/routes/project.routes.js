const express = require('express')
const ProjectController = require('../controller/Project.controller')
const router = express.Router()
const { authenticateToken , checkRole} = require('../middleware/auth.middleware')

router.get('/',ProjectController.getAll)
router.get('/populate',authenticateToken, checkRole('Leader', 'Manager'), ProjectController.getProjectPopulate)
router.get('/:id', ProjectController.findById)
router.get('/member/:id', ProjectController.findByIdMember)
router.post('/add',authenticateToken, checkRole( 'Manager'), ProjectController.add)
router.post('/active',authenticateToken, checkRole('Leader', 'Manager'), ProjectController.activeProject)
router.post('/complete/:id',authenticateToken, checkRole('Leader', 'Manager'), ProjectController.completeProject)
router.post('/addMember',authenticateToken, checkRole('Leader', 'Manager'), ProjectController.addMember)
router.put('/update/:id',authenticateToken, checkRole('Leader', 'Manager'), ProjectController.update)
router.patch('/kickMember',authenticateToken, checkRole('Leader'), ProjectController.kickMemberFormProject)
router.delete('/delete/:id',authenticateToken, checkRole('Leader', 'Manager'), ProjectController.delete)
module.exports = router 