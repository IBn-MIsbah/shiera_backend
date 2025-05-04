const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require("passport-local-mongoose")
const User = require('../models/user.js')
const Note = require('../models/note.js')

const {isLoggedIn} = require('../middleware/authMiddleware.js')

const router = express.Router()

router.get('/login', (req, res)=>{
  res.render('auth/login', {
    title: 'LogIn',

  })
})
router.get('/register', (req, res)=>{
  res.render('auth/register',{
    title: 'SignUp'
  })
})

router.post('/register', async(req, res)=>{
  try{
    const {username, email, password} = req.body
    const exists = await User.findOne({email})
    if(exists){
      return res.redirect('/login')
    }
    console.log(req.body)
    const newUser = new User ({username, email})
    User.register(newUser, password, async(err, user)=>{
      if(err){
        console.error(err.message)
        return res.redirect('/register')
      }
      passport.authenticate('local')(req, res, async()=>{
        const fullUser = await User.findById(user._id).populate('notes')
        res.render('notes/dashboard')
        console.log(fullUser)
      })
    })

  } catch(err){
    console.error(err)
    console.error(err.message)
    res.send('Someting went wrong. User could not register. Please try again!', err.message)
  }
})

router.get('/dashboard', isLoggedIn, async(req,res)=>{
  try {
    const userInfo = await User.findById(req.user._id).populate('notes'); 
    
    if (!userInfo) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }

    console.log('User info:', userInfo);
    
    res.render('notes/dashboard', {
      title: 'Dashboard',
      notes: userInfo
    });

  } catch (err) {
    console.error('Dashboard error:', err);
    req.flash('error', 'Error accessing dashboard');
    res.redirect('/login');
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}))

router.get('/logout', (req,res)=>{
  req.logOut((err)=>{
    if(err){
      res.status(500).send('error loging out')
    }
    res.redirect('/')
  })
})

router.get('/notes/create', (req, res)=>{
  res.render('notes/create-note')
})




module.exports = router;