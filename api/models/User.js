var mongoose = require("mongoose"),
	bcrypt = require("bcrypt-nodejs");
	
var UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

UserSchema.methods.toJSON = function(){
	var user = this.toObject();
	delete user.password;
	delete user.__v;

	return user;
};

UserSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();


    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);
