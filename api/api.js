var express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/User.js"),
    jwt = require("jwt-simple"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.set('port', (process.env.PORT || 5000))
var jobs = [
    "html 5",
    "CSS3",
    "Angular JS",
    "jQuery"
];

app.get('/jobs', function(req, res) {

    if (!req.headers.authorization)
        return res.status(401).send({
            message: "You are not authorized!"
        });

    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, "mysecretkey");

    if (!payload.sub) {
        return res.status(401).send({
            message: "You are not authorized!"
        });
    }

    res.json(jobs);
});

app.get('/', function(req, res) {
    res.send({
        name: "Hello from GET"
    });
});

mongoose.connect("mongodb://hemant:123@ds053320.mongolab.com:53320/jobfinder");

var strateguOptions = {
    usernameField: "email"
};

var loginStrategy = new LocalStrategy(strateguOptions, function(email, password, done) {
    User.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Incorrect email.'
            });
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) return done(null, false, {
                message: 'Incorrect password.'
            });
            return done(null, user);
        });

    });
});


var registerStrategy = new LocalStrategy(strateguOptions, function(email, password, done) {
    var newUser = new User({
        email: email,
        password: password
    });

    User.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'Email already exists'
            });
        }

        newUser.save(function(err) {
            done(null, newUser);
        });

    });
});

passport.use("local-register", registerStrategy);
passport.use("local-login", loginStrategy);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
    createSendToken(req.user, res);
});

app.post("/login", passport.authenticate('local-login'), function(req, res) {
    createSendToken(req.user, res);
});


function createSendToken(user, res) {
    var payload = {
        sub: user._id
    };

    var token = jwt.encode(payload, "mysecretkey");

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });

}

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});
