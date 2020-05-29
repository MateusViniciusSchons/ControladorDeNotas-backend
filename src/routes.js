const express = require('express')

const sessionController = require('./controllers/sessionController')
const userController = require('./controllers/userController')
const gradesController = require('./controllers/gradesController')
const mattersController = require('./controllers/mattersController')
const calculationsController = require('./controllers/calculationsController')

const router = express.Router()

//router.post('/login', sessionController.store)
//router.post('/users/create', userController.store)
// cria e atualiza metérias e notas
    //router.post('/grades/create', gradesController.update)
//router.get('/matters/:matterid', mattersController.show)
//router.get('/matters', mattersController.index)
//router.get('/matters/:matterid', mattersController.delete)
router.post('/calculations/grade', calculationsController.calculateGrade)
router.post('/calculations/finalaverage', calculationsController.calculateFinalAverage)

module.exports = router