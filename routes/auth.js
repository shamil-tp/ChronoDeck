const express = require('express')
const router = express.Router()

const { loginPage, login, logout, GetRegisterPage, Register } = require('../controllers/auth')


router
    .route('/login')
    .get(loginPage)
    .post(login)
router
    .route('/register')
    .get(GetRegisterPage)
    .post(Register)

router
    .route('/logout')
    .get(logout)

module.exports = router