const LocalStrategy = require("passport-local").Strategy;
const passwordHash = require("password-hash");
const validator = require("validator");
const Connection = require("../db/Db");

const USER_SELECT_BY_USERNAME = "SELECT user_id, username, email, password, create_date, first_name, last_name FROM users WHERE username = ?";
const USER_SELECT_BY_ID  = "SELECT user_id, username, email, password, create_date, first_name, last_name FROM users WHERE user_id = ?";
const VERIFY_SIGNUP = "SELECT user_id, username, email, password, create_date, first_name, last_name FROM users WHERE username = ? OR email = ?";
const INSERT_USER   = "INSERT INTO users (username, email, password, create_date, first_name, last_name) VALUES (?, ?, ?, NOW(), ?, ?)";

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) => {
        let connector = new Connection();
        connector.query(USER_SELECT_BY_ID, [user_id], (error, rows) => {
            done(error, rows[0]);
        });
    });

    passport.use("local-signup", new LocalStrategy(
        {   usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        (req, username, password, done) => {
            if (password != req.body.confirm) {
                return done(null, false, req.flash("signupMessage", "Passwords do not match."));
            }

            if (validator.isEmail(req.body.email) && validator.isAlphanumeric(username) &&
                validator.isAlphanumeric(password) && validator.isAlphanumeric(req.body.firstName) &&
                validator.isAlphanumeric(req.body.lastName)) {

                let connector = new Connection();
                connector.query(VERIFY_SIGNUP, [username, req.body.email], (error, rows) => {
                    if (error) {
                        return done(error);
                    }
                    if (rows.length) {
                        return done(null, false, req.flash("signupMessage", "This username or email is already in use."));
                    } else {
                        let user = {
                            username: username,
                            password: passwordHash.generate(password),
                            email: req.body.email,
                            first_name: req.body.firstName,
                            last_name: req.body.lastName
                        };
                        connector.query(INSERT_USER, [user.username, user.email, user.password, user.first_name, user.last_name], (err, rows) => {
                            if(err) {
                                throw new Error(err);
                            }
                            user.user_id = rows.insertId;

                            return done(null, user);
                        });
                    }
                });
            }
        })
    );

    passport.use(
        "local-login",
        new LocalStrategy(
            {   usernameField: "username", 
                passwordField: "password", 
                passReqToCallback: true
            },
            (req, username, password, done) => {
                let connector = new Connection();
                connector.query(USER_SELECT_BY_USERNAME, [username], (error, rows) => {
                    if (error) {
                        return done(error);
                    }
                    if (!rows.length || !passwordHash.verify(password, rows[0].password)) {
                        return done(null, false, req.flash("loginMessage", "Invalid username/password combination."));
                    }
                    return done(null, rows[0]);
                });
            }
        )
    );
};
