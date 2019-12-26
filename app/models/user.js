var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortly');
mongoose.Promise = Promise;

let userSchema = mongoose.Schema({
  // TODO: your schema here!
  id:{ //repo ID
    type:Number,
    required:true
},

  username:String, // the name of the repo
  password:String, //the owner of the repo //login,
  created_at:Date,
  updated_at:Date
});

let User = mongoose.model('user', userSchema);
// add this fucntions in the user instance

x
 User = db.Model.extend ( {
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;
