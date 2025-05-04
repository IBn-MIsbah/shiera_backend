const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require("passport-local-mongoose")

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

router.get('/dashboard',(req,res)=>{
  let notes = []
  const user = {
    username: 'Kawnullah'
  }
  res.render('notes/dashboard', {
    title: 'Dashboard',
    notes: notes,
    user: user
  })
})

router.get('/notes/create', (req, res)=>{
  res.render('notes/create-note')
})




module.exports = router;