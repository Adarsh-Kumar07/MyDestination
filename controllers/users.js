const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async(req, res) => {
    try {
        let {name, username, email, password} = req.body;
        const newuser = new User({name, email, username});
        const registerUser = await User.register(newuser, password);
        req.login(registerUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","Registration Successfull.");
            res.redirect("/listings");
        })  
    } catch(err) {
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.signInForm = (req, res) => {
    res.render("users/signin.ejs");
};

module.exports.signIn = async(req, res) => {
    req.flash("success", "Welcome Back, You are logged in.");
    let url = (res.locals.redirectUrl || "/listings");
    res.redirect(url);
};

module.exports.logout =  (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Come Back Again!");
        req.redirect("/listings");
    })
};