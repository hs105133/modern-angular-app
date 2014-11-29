var express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/User.js"),
    jwt = require("jwt-simple");

var app = express();

app.use(bodyParser.json());

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

    if(!req.headers.authorization)
        return res.status(401).send({message: "You are not authorized!"});

    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, "mysecretkey");

    if(!payload.sub){
        return res.status(401).send({message: "You are not authorized!"});
    }

    res.json(jobs);
});

app.get('/', function(req, res) {
    res.send({
        name: "Hello from GET"
    });
});

mongoose.connect("mongodb://localhost/jobfinder");


app.post('/register', function(req, res) {
    var newUser = new User(req.body);

    newUser.save(function(err, data){    	
        createSendToken(newUser, res);
    });
});

app.post("/login", function(req, res){
    var inputUser = req.body;

    User.findOne({email: inputUser.email}, function(err, user){
        if(err) throw err;

        if(!user) 
            return res.status(401).send({message: "Wrong email/password"});

        user.comparePassword(inputUser.password, function(err, isMatch){
            if(err) throw err;

            if(!isMatch){
                return res.status(401).send({message: "Wrong email/password"});
            }

            createSendToken(user, res);
        });
    })
});


function createSendToken(user, res){
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
