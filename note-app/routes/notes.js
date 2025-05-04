const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const { isLoggedIn } = require('../middleware/authMiddleware');

// Dashboard - Show all notes
router.get('/dashboard', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const notes = await Note.find({ user: req.user._id });
    
    res.render('dashboard', {
      username: user.username, // Direct username access
      notes: notes
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create new note
router.get('/create', isLoggedIn, async(req, res) => {

  // const user = await User.findById(req.user._id);
  res.render('notes/create-note', /* {
    username: user.username
  } */);
});

router.post('/create', isLoggedIn, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      user: req.user._id
    });
    await newNote.save();
    res.redirect('/notes/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/notes/create');
  }
});


module.exports = router;