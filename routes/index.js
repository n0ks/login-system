var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', verifAuth, function (req, res, next) {
	res.render('index', {
		title: 'Members'
	});
});

module.exports = router;

function verifAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('users/login');


}
