require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require("passport-local-mongoose")
const bodyparser = require('body-parser')
const User = require('./models/user.js')
const Note = require('./models/note.js')

const authRoutes = require('./routes/auth'); 
const app = express()
const port = 3000

mongoose.connect("mongodb://localhost:27017/noteApp")
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(`Error: ${err}`))

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json())


app.use(session({
  secret: process.env.SECRET || 'asdfghjkl;qwertyuiop',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())


passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', authRoutes)

app.get('/', (req, res)=>{
  res.render('index.ejs')
})

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server active on http://localhost:${port}`);
});