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


// User.comparePassword = function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   }
  User.comparePassword = function(candidatePassword, savedPassword, cb) {
    bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
//  User = db.Model.extend ( {
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   ,
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });
userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null)
    .bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
