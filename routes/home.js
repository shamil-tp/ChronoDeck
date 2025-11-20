const express = require('express')
const { GetHomePage, GetAboutPage, GetGamesPage } = require('../controllers/home')
const router = express.Router()



router
    .route('/')
    .get(GetHomePage)
router
    .route('/games')
    .get(GetGamesPage)
router
    .route('/about')
    .get(GetAboutPage)


module.exports = router