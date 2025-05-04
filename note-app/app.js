require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require("passport-local-mongoose")
const bodyparser = require('body-parser')

const app = express()
const port = 3000

app.get('/', (req, res)=>{
  res.render('index.ejs')
})

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server active on http://localhost:${port}`);
});