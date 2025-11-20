const express = require('express')
const { GetHomePage, GetAboutPage } = require('../controllers/home')
const router = express.Router()



router
    .route('/')
    .get(GetHomePage)
router
    .route('/about')
    .get(GetAboutPage)


module.exports = router