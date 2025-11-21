const express = require('express')
const { GetHomePage, GetAboutPage, GetGamesPage, GetSupportPage } = require('../controllers/home')
const { IssueReport } = require('../controllers/issue')
const { SendMail } = require('../controllers/footer')
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
router
    .route('/support')
    .get(GetSupportPage)
    .post(IssueReport)
router
    .route('/sendmail')
    .post(SendMail)

module.exports = router