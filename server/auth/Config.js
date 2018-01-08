const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const validator = require('validator');
const Connection = require('../db/DbConnection');

const USER_SELECT_BY_USERNAME = 'SELECT user_id, username, email, password, create_date, first_name, last_name, role FROM users WHERE username = ?';
const USER_SELECT_BY_ID  = 'SELECT user_id, username, email, password, create_date, first_name, last_name, role FROM users WHERE user_id = ?';
const VERIFY_SIGNUP = 'SELECT user_id, username, email, password, create_date, first_name, last_name FROM users WHERE username = ? OR email = ?';
const INSERT_USER   = 'INSERT INTO users (username, email, password, create_date, first_name, last_name) VALUES (?, ?, ?, NOW(), ?, ?)';

/**
 * Creates configuration for login and signup authorization via Passport.js
 * @param {*} passport - passport module
 */
module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) => {
        let connector = new Connection();
        let user = connector.query(USER_SELECT_BY_ID, [user_id]);
        done(user.error, user.rows[0]);
    });

    passport.use('local-signup', new LocalStrategy(
        {   usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            if (password != req.body.confirm) {
                return done(null, false, req.flash('signupMessage', 'Passwords do not match.'));
            }

            if (validator.isEmail(req.body.email) && validator.isAlphanumeric(username) &&
                validator.isAlphanumeric(password) && validator.isAlphanumeric(req.body.firstName) &&
                validator.isAlphanumeric(req.body.lastName)) {

                let connector = new Connection();
                let signup = connector.query(VERIFY_SIGNUP, [username, req.body.email]); 

                if (signup.error) {
                    return done(signup.error);
                }
                if (signup.rows.length) {
                    return done(null, false, req.flash("signupMessage", "This username or email is already in use."));
                } else {
                    let user = {
                        username: username,
                        password: passwordHash.generate(password),
                        email: req.body.email,
                        first_name: req.body.firstName,
                        last_name: req.body.lastName
                    };
                    let result = connector.query(INSERT_USER, [user.username, user.email, user.password, user.first_name, user.last_name]);
                    if(result.error) {
                        throw new Error(result.error);
                    }
                    user.user_id = result.insertId;

                    return done(null, user);
                 
                }
            }
        }
    ));

    passport.use('local-login',
        new LocalStrategy(
            {   usernameField: 'username', 
                passwordField: 'password', 
                passReqToCallback: true
            },
            (req, username, password, done) => {
                let connector = new Connection();
                let user = connector.query(USER_SELECT_BY_USERNAME, [username]);
                
                if (user.error) {
                    return done(user.error);
                }
                if (!user.rows.length || !passwordHash.verify(password, user.rows[0].password)) {
                    return done(null, false, req.flash('loginMessage', 'Invalid username/password combination.'));
                }
                return done(null, user.rows[0]);
               
            }
        )
    );
};
