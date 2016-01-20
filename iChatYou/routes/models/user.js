var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
/*
var schema = mongoose.Schema({
  username  : String,
  password: String
});

module.exports = { model: mongoose.model('UserInfo', schema), schema: schema }
*/
// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    firstname         : String,
    lastname          : String,
    mobile            : Number,
    college           : String,
    stream            : String,
    passingYear       : Number,
    resetCode         : String

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);
module.exports = { model: mongoose.model('UserInfo', userSchema), schema: userSchema }
