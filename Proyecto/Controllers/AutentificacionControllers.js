'use strict';
const uuidv4 = require('uuid/v4');
var bCrypt = require('bcrypt-nodejs');
var models = require('./../models');
class AutentificacionControllers {
    signup(req, res) {
        res.render('Vista/Registrar', {title: 'Registrar'});
    }
    signin(req, res) {
        res.render('Vista/Cuenta', {title: 'Inicio de sesion'});
    }
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }
    logout(req, res) {

    }
    mostrarPersonas(req, res, next) {
        var Personas = models.persona;
        Personas.findAll().then(function (persona) {
            console.log("*************************************" + persona + "*******************************");
            res.send(persona);
        });
    }
    log(req, res, next) {
        var x = req.user;
        res.send(x);
    }
    mostrarCuenta(req, res, next) {
        var user = models.cuenta;
        user.findAll().then(function (cuenta) {
            console.log("*************************************" + cuenta + "*******************************");
            res.send(cuenta);
        });
    }
    eliminarUsuario(req, res, next) {
        console.log("*************************************1*******************************");
        var Personas = models.persona;
        var user = models.cuenta;
        console.log("*************************************" + req.body.id + "*******************************");
        user.destroy({where: {id: req.body.id}}).then(function (err, result) {
            Personas.destroy({where: {id: req.body.id}}).then(function (rowsDelete) {
                res.redirect('/verUsuarios');
            }).catch(next);
        }).catch(next);

    }
    eliminarCuenta(req, res, next) {
        console.log("*******************************************************");
        var Personas = models.persona;
        var user = models.cuenta;
        var id =req.user.id;
        req.session.destroy();
        user.destroy({where: {id: id}}).then(function (err, result) {
             console.log("*******************************************************");
            Personas.destroy({where: {id: id}}).then(function (rowsDelete) {
                res.redirect('/');
            }).catch(next);
        }).catch(next);

    }
    editarUsuario(req, res, next) {
        var Personas = models.persona;
        var user = models.cuenta;
        console.log(req.body.email+"****************************************");
        console.log(req.user.usuario+"****************************************");
        if (req.body.email !== req.user.usuario) {
            user.findOne({where: {usuario: req.body.email}}).then(function (cuenta) {
                if (!cuenta) {
                    user.update(
                            {correo: req.body.email},
                            {returning: true, where: {id: req.user.id}}
                    ).then(function (rowsUpdate) {
                        Personas.update(
                                {correo: req.body.email,
                                    nombres: req.body.nombre,
                                    apellidos: req.body.apellido},
                                {returning: true, where: {id: req.user.id}}
                        ).then(function (rowsUpdate) {
                            res.redirect('/verPerfil');
                        }).catch(next);
                    }).catch(next);
                } else {
                    console.log("***************************************************");
                    console.log('Correo repetido');
                    res.redirect('/verPerfil');
                }
            });
        } else {
            Personas.update(
                    {nombres: req.body.nombre,
                        apellidos: req.body.apellido},
                    {returning: true, where: {id: req.user.id}}
            ).then(function (rowsUpdate) {
                res.redirect('/verPerfil');
            }).catch(next);
        }



    }
}
module.exports = AutentificacionControllers;
