var express = require('express');
var router = express.Router();
var autentification = require('../Controllers/AutentificacionControllers');
var authController = new autentification();
var document = require('../Controllers/documentoController');
var docController = new document();
var passport = require('passport');
var models = require('./../models');
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("********************" + req.user.id_rol + "**************");
        
        res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista',login: true, loginA: req.user.id_rol});
    } else {
        res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});
router.get('/cerrar', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

//Login
router.get('/inicio', authController.signin);
router.post('/login', passport.authenticate('local-signin', {successRedirect: '/',
    failureRedirect: '/inicio'}
));

//Registro
router.get('/registro', authController.signup);
router.post('/registro/save', passport.authenticate('local-signup', {successRedirect: '/',
    failureRedirect: '/registro'}
));

//registar Revista
router.post('/registrarRevista', docController.registrarRevista);
router.get('/mostrarRevista', docController.mostrarRevista);
router.post('/editarRevista', docController.editarRevista);
router.post('/eliminarRevista', docController.eliminarRevista);

//registar Articulo
router.post('/registrarArticulo', docController.registrarArticulo);
router.get('/mostrarArticulo', docController.mostrarArticulo);
router.post('/editarArticulo', docController.editarArticulo);
router.post('/eliminarArticulo', docController.eliminarArticulo);


//registar Libro
router.post('/registrarLibro', docController.registrarLibro);
router.get('/mostrarLibro', docController.mostrarLibro);
router.post('/editarLibro', docController.editarLibro);
router.post('/eliminarLibro', docController.eliminarLibro);

//mostrar personas
router.get('/mostrarPersonas', authController.mostrarPersonas);
router.get('/mostrarCuentas', authController.mostrarCuenta);
router.post('/eliminarUsuario', authController.eliminarUsuario);
router.get('/log', authController.log);
router.post('/eliminarCuenta', authController.eliminarCuenta);
router.post('/editarUsuario', authController.editarUsuario);


router.get('/registrar', function (req, res, next) {
    res.render('Vista/Registrar', {title: 'Express'});
});

router.get('/cuenta', function (req, res, next) {
    res.render('Vista/Cuenta', {title: 'Express'});
});


router.get('/Revista', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('Vista/Revistas', {title: 'Principal', login: req.isAuthenticated(), loginA: req.user.id_rol});
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }

});

router.get('/Articulos', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('Vista/Articulos', {title: 'Principal', login: req.isAuthenticated(), loginA: req.user.id_rol});
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }

});

router.get('/Libros', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('Vista/Libros', {title: 'Principal', login: req.isAuthenticated(), loginA: req.user.id_rol});
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});

router.get('/guardarRevista', function (req, res, next) {
    if (req.isAuthenticated()&& req.user.id_rol==1) {
        res.render('Vista/GuardarRevista', {title: 'Principal', login: req.isAuthenticated()});
    } else {
        res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});
router.get('/guardarLibro', function (req, res, next) {
    if (req.isAuthenticated()&& req.user.id_rol==1) {
        res.render('Vista/GuardarLibro', {title: 'Principal', login: req.isAuthenticated()});
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});
router.get('/guardarArticulo', function (req, res, next) {
    if (req.isAuthenticated()&& req.user.id_rol==1) {
        res.render('Vista/GuardarArticulo', {title: 'Principal', login: req.isAuthenticated()});
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});

router.get('/verUsuarios', function (req, res, next) {
    if (req.isAuthenticated()&& req.user.id_rol==1) {
        res.render('Vista/VerUsuarios', {title: 'Lista de usuarios'});
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});

router.get('/verPerfil', function (req, res, next) {
    if (req.isAuthenticated()) {
        var persona = models.persona;
         persona.findOne({where: {id: req.user.id}}).then(function(persona){
             console.log("******************************************"+persona.id);
           res.render('Vista/VerCuenta', {title: 'Lista de usuarios', nombre:persona.nombres, apellido:persona.apellidos, correo: persona.correo});
       });
        
    } else {
         res.render('Vista/Vista', {title: 'Principal',fragmento: '../Vista/fragmento/Vista', login: false, loginA: ''});
    }
});



module.exports = router;
