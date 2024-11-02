const express = require('express')

const { 
  getAllWords
} = require('../controllers/wordController')

// instance of express router
const router = express.Router()

// routes

// GET all workouts
router.get('/', getAllWords)

// export router to have access to the routes elsewhere
module.exports = router