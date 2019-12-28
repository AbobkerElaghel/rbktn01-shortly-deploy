var db = require('../config');
var crypto = require('crypto');


let urlSchema = mongoose.Schema({
  // TODO: your schema here!
  id:{ //repo ID
    type:Number,
    required:true
},
  url:String, // the name of the repo
  baseUrl:String, //the owner of the repo //login
  code:String,   //the link to the repo
  title:String, //description for the repo
  visits:Number
});



let url = mongoose.model('url', urlSchema);

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
