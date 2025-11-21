require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const path = require('path');


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')




app.use('/bootstrap-icons', express.static(path.join(__dirname, 'node_modules', 'bootstrap-icons', 'font')));
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('static'))


const auth = require('./routes/auth')
const home = require('./routes/home')
const game = require('./routes/games')
const admin = require('./routes/admin')
// const admin = require('./routes/admin')
const { isLoggedin, isAdmin,} = require('./middlewares/auth')


// app.use('/admin', admin)
app.use('/', auth)
app.use('/',isLoggedin,home)
app.use('/game',isLoggedin,game)
app.use('/admin',isLoggedin,isAdmin,admin)
app.use((req, res) => {
    return res.send('404')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    connectDB()
});
