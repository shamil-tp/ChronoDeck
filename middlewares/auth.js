const jwt = require('jsonwebtoken')

exports.isLoggedin = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.redirect('/login')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (e) {
        console.log(e)
        return res.cookie('token', null).redirect('/login')
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (!req.user.role.includes('admin')) {
            // return res.redirect('/')
            return res.render('auth/login',{msg:'not admin'})
        }
        return next()
    } catch (e) {
        console.log(e)
        return res.redirect('/login')
    }
}

// exports.isPharm = (req,res,next)=>{
//     if(!req.user.role.includes('pharm')){
//         return res.redirect('/')
//     }
//     return next()
// }

// exports.isDesk = (req,res,next)=>{
//     if(!req.user.role.includes('desk')){
//         return res.redirect('/')
//     }
//     return next()
// }