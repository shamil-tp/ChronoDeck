const express = require('express')
const { GetAdminPage } = require('../controllers/admin')
const router = express.Router()

router
    .route('/')
    .get(GetAdminPage)

module.exports = router