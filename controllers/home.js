const User = require('../models/User')
const sendCookie = require('../utils/sendCookie')

exports.GetHomePage = (req, res) => {
    try {
        console.log(req.user)
        let username = req.user.name
        return res.render('home/home',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}
exports.GetAboutPage = (req, res) => {
    try {
        let username = req.user.name
        return res.render('home/about',{username:username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}
