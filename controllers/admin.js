const User = require('../models/User')
const Issue = require('../models/Issue')


exports.GetAdminPage = async (req, res) => {
    try {
        let user = await User.find()
        let issue = await Issue.find()
        let username = req.user.name
        return res.render('admin/admin',{user,issue,username})
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}