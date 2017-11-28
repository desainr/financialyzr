const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", passport.authenticate("local-login", {successRedirect: "/", failureRedirect: "/login", failureFlash: true}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


router.post("/signup", passport.authenticate("local-signup", {
    successRedirect : "/login", 
    failureRedirect : "/signup",
    failureFlash : true 
}));

module.exports = router;