const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const router = express.Router();

const authController = require("../controllers/controller-auth");

// PUT => /auth/signup
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject("Email address already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("name")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post("/login", [], authController.login);

module.exports = router;
