const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const {isLoggedIn} = require('../middleware/authMiddleware.js')

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.get('/dashboard', isLoggedIn, (req,res)=> {
  res.render('notes/dashboard')
})

router.post('/register', async (req, res)=>{
  try{
    const {username, email, password} = req.body
    const newUser = new User({username, email})
    await User.register(newUser, password);
    passport.authenticate('local')(req, res, ()=> res.redirect('/dashboard'))

  }catch(err){
    console.error(err.message)
  }
})

router.get('/login', (req,res)=> res.render('auth/login'))
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err);
    }
    if (!user) return res.redirect('/login');
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

router.get('/logout', (req, res)=>{
  req.logOut(()=>{
    res.redirect('/')
  })
})

module.exports = router;