require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

// 📦 Middleware: express + static
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 🧠 MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notesApp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 👤 User model
const User = require('./models/user');

// 🔑 Session config (Must be BEFORE passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// 🔐 Passport setup (AFTER session + model)
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 📄 Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 🌐 Routes
app.use('/', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
