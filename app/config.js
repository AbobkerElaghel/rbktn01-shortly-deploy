var path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortly');
mongoose.Promise = global.Promise;

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });


// var db = require('bookshelf')(knex);



// ???????
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// }); ????????



// Old schema declaration for urls
// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

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
  visits:Number,
  created_at:Date,
  updated_at:Date
});



let url = mongoose.model('url', urlSchema);


// Old schema declaration for users
// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });



// module.exports = db;

// OR //

// module.exports.user = user;
// module.exports.url = url;
