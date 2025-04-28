const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
    .get( userController.renderSignUpForm)
    .post( wrapAsync(userController.signUp));

router.route("/signin")
    .get( userController.signInForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local", 
    {failureRedirect: "/signin", 
    failureFlash: true}), 
    userController.signIn);

router.get("/logout",userController.logout);

module.exports = router;
