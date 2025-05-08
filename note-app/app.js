require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyparser = require("body-parser");
const User = require("./models/user.js");
const flash = require("connect-flash");
const GoogleStrategy = require("passport-google-oauth20");


const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes.js");
const app = express();
const port = 4000;

mongoose
  .connect("mongodb://localhost:27017/noteApp")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/note-app",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      const email = profile.email?.[0].value || `${profile.id}@nomail.com`
      User.findOrCreate(
        { googleId: profile.id },
        {username: profile.displayName || "Google User",
          email: email,
        },
        
         function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use("/", authRoutes);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  const date = new Date;
  res.render("index.ejs", { date: date.getFullYear()});
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server active on http://localhost:${port}`);
});
