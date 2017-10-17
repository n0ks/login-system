var express = require('express');
var router = express.Router();
var User = require('../models/user');
   

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    res.render('register', {
        'title': 'Register'
    });

});

router.get('/login', function (req, res, next) {
    res.render('login', {
        'title': 'Login'
    });

});

router.post('/register', function (req, res, next) {
    //Pegando valores do form
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    //Checar campo de imagem
    if (req.files && req.files.profileImage) {
        console.log('Uploading File..');
        //Info
        var profileImageOriginalName = req.files.profileimage.originalname;
        var profileImageName = req.files.profileimage.name;
        var profileImageMime = req.files.profileimage.mimetype;
        var profileImagePath = req.files.profileimage.path;
        var profileImageExt = req.files.profileimage.extension;
        var profileImageSize = req.files.profileimage.size;
    } else {
        // Default Image
        var profileImageName = 'noimage.png';
    }
    //Validar form pegando os valores do register.jade
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email not valid').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    //Checando erros
    var errors = req.validationErrors();

    if (errors) {
        //Renderiza os erros na tela de acordo com o campo
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        //Se não tiver nenhum erro coloca os dados no objeto newUser
        var newUser = new User({
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2,
            profileImage: profileImageName

        });

        //Criar Usuário
                User.createUser(newUser, function (err, user) {
                    if (err) throw err;
                    console.log(user);
        
                });

        req.flash('success', 'Você está registrado e pode logar');
        res.location('/');
        res.redirect('/');

    }

});



module.exports = router;
