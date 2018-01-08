const express = require('express');
const passport = require('passport');

const router = express.Router();

// Login authorization
router.post('/login', passport.authenticate('local-login', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

// Logs user out
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Signup authorization
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login', 
    failureRedirect : '/signup',
    failureFlash : true 
}));

module.exports = router;