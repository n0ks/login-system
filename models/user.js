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

module.exports.comparePassword = function (password, hash, callback) {
	bcrypt.compare(password, hash, function (err, isMatch) {
		if (err) return callback(err);
		callback(null, isMatch)

	});

}

module.exports.getUserById = function (id, callback) {

	User.findById(id, callback);

}

module.exports.getUserByUsername = function (username, callback) {
	var query = {
		username: username
	};

	User.findOne(query, callback);

}

module.exports.createUser = function (newUser, callback) {

	bcrypt.hash(newUser.password, 10, function (err, hash) {
		if (err) throw err;
		//pwd em hash
		newUser.password = hash;
		newUser.save(callback);
	});
}
