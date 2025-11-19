const e = require('express')
const User = require('../models/User')
const sendCookie = require('../utils/sendCookie')

exports.loginPage = (req,res)=>{
    return res.render('auth/login',{msg:""})
}
exports.GetRegisterPage = (req,res)=>{
    return res.render('auth/register',{msg:""})
}

exports.login = async(req,res)=>{
    try{
        const {username,password}=req.body

        const user = await User.findOne({userName:username})
        if(!user){
            return res.render('login',{msg:'Incorrect'})
        }
 
        const validation = await user.isValidatedPassword(password)

        if(!validation){
            return res.render('login',{msg:'Incorrect'})
        }
        req.user = username
        return sendCookie(user,res)
       
    }catch(e){
        console.log(e)
        return res.send('error')
    }
}
exports.Register = async (req,res) =>{
    try{
        
    }catch(e){
        console.log(e)
        return res.send('<h3>something went wrong</h3>')
    }
}
exports.logout = (req,res)=>{
    return res.cookie('token', null).redirect('/login')

}