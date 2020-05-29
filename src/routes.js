const express = require('express')

const calculationsController = require('./controllers/calculationsController')

const router = express.Router()
router.post('/calculations/grade', calculationsController.calculateGrade)
router.post('/calculations/finalaverage', calculationsController.calculateFinalAverage)

module.exports = router