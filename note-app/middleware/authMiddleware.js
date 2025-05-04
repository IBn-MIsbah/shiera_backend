module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Please log in to access this page"); // Add flash message
    res.redirect("/login");
  },

  isNotLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash("info", "You are already logged in"); // Add flash message
    res.redirect("/notes/dashboard");
  },
};
