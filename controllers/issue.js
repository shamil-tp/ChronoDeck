const Issue = require('../models/Issue')

exports.IssueReport =   async (req,res) =>{
    try {
        let {email, issueCategory, issue} = req.body
        await Issue.create({
            id:Date.now(),
            email:email,
            issueCategory:issueCategory,
            issue:issue
        })
        return res.redirect('/support')
    } catch (e) {
        console.log(e)
        return res.send('something is wrong')
    }
}