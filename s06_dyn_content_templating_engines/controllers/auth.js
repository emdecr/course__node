const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5ea85a1da09aa07cf53dfb66")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};
