const express = require('express')
const { GetAirPage, GetTicPage, GetTrafficPage, GetStonePage, GetDinoPage, GetTouchPage } = require('../controllers/games')
const router = express.Router()

router
    .route('/air')
    .get(GetAirPage)
router
    .route('/traffic')
    .get(GetTrafficPage)
router
    .route('/tic')
    .get(GetTicPage)
router
    .route('/stone')
    .get(GetStonePage)
router
    .route('/dino')
    .get(GetDinoPage)
router
    .route('/touch')
    .get(GetTouchPage)

module.exports = router