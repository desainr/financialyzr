const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./server/routes/Routes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const auth = require("./server/auth/Auth");
const logger = require("morgan");
const flash = require("connect-flash");
const passportConfig = require("./server/auth/Config");

require("dotenv").config();

const app = express();

app.use(logger("dev"));

// template engine setup 
app.engine("ejs", require("ejs-locals"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "server/static/templates"));

// request processing & sessions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_KEY));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

// passport config 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passportConfig(passport);

// static directories
app.use(express.static(path.join(__dirname, "server/static")));
app.use(express.static(path.join(__dirname, "client/dist")));


// data routes
app.use("/api", routes);
app.use("/auth", auth);

// page routes
app.get("/signup", (req, res) => {
    res.render("signup", {error: req.flash("signupMessage")});
});

app.get("/login", (req, res) => {
    res.render("login", {error: req.flash("loginMessage")});
});

app.get("/", isLoggedIn, (req,res) => {
    res.render("home");
});

app.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = app;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
}