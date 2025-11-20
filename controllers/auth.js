// const e = require('express')
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

        const user = await User.findOne({username:username})
        if(!user){
            return res.render('auth/login',{msg:'Incorrect username'})
        }
 
        const validation = await user.isValidatedPassword(password)

        if(!validation){
            return res.render('auth/login',{msg:'Incorrect password'})
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
        console.log(req.body)
        let {name,username,email,phone,dob,role,} = req.body
        if(!(req.body.password == req.body.confirmPassword)){
            return res.render('auth/register',{msg:'passwords doesnt match'})
        }
        let password = req.body.password
        await User.create({
            id:Date.now(),
            name:name,
            username:username,
            email:email,
            phone:phone,
            dob:dob,
            role:role,
            password:password,

        })
        return res.redirect('/login')
    }catch(e){
        console.log(e)
        return res.send('<h3>something went wrong</h3>')
    }
}
exports.logout = (req,res)=>{
    return res.cookie('token', null).redirect('/login')

}