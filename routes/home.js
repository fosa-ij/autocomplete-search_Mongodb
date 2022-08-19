const express = require('express')
const router = express.Router()
const homeController = require('../controller/home')

router.get('/', homeController.getHomePage)
router.get('/search', homeController.getMovies)
router.get('/get/:id', homeController.getMoviePage)

module.exports = router