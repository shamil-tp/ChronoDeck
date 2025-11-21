const sendMail = require('../utils/mail')

exports.SendMail = async (req, res) => {
    try {
        let mailSend = sendMail(req.body.email)
        return res.redirect('/')
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}