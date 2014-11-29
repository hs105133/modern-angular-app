# Node JS API workflow

```
npm install express --save
npm install body-parser --save
npm install mongoose --save
npm install bcrypt-nodejs --save
npm install crypto --save
npm install jwt-simple --save
npm install passport --save
npm install passport-local --save

```

##  Allow CORS

```javascript
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});
```

## get POST data

add `body-parser` module

```
app.use(bodyParser.json());
```

```javascript
app.post('/register', function(req, res) {
  req.body.id = 19;		
  res.send(req.body);
});
```

## mongoose get going
> start mongodb server
>> mongod

```javascript
// 1 
mongoose = require("mongoose")

// 2

var User = mongoose.model("User", {
	email: String,
	password: String
});

// 3 
mongoose.connect("mongodb://localhost/jobfinder");

// 4
app.post('/register', function(req, res) {
	// req.body = {email:"hemant@gmail.com", password: "12"}
    var newUser = new User(req.body);
    res.status(200).json(newUser);
});
```


