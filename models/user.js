var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

//User scheme

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true

  },
  email: {
    type: String
  },
  name: {
    type: String

  },
  profileImage: {
    type: String
  }
});
// exportando para usar o modulo

var User = module.exports = mongoose.model('User', UserSchema);
module.exports.createUser = function(newUser, callback) {

  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if (err) throw err;
    //pwd em hash
    newUser.password = hash;
    newUser.save(callback);
  });
}
