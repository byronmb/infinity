var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
module.exports = function (passport, cuenta, persona, rol) {
    var Cuenta = cuenta;//modelo
    var Persona = persona;//modelozz
    var Rol = rol;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (res, id, done) {
        Cuenta.findById(id).then(function (cuenta) {
            if (cuenta) {
                done(null, cuenta.get());
            } else {
                done(cuenta.errors, null);
                
            }
        });

    });
    //registro de usuarios por passport
    passport.use('local-signup', new LocalStrategy(
            {
                usernameField: 'email', //lo que esta como name en el input del registro
                passwordField: 'clave', //lo que esta como name en el input del registro
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var generateHash = function (password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                //verificar si el email no esta registrado
                Cuenta.findOne({
                    where: {
                        usuario: email
                    }
                }).then(function (cuenta) {
                    if (cuenta)
                    {
                        return done(null, false, {
                            message: 'El correo ya esta registrado'
                        });

                    } else
                    {
                        var userPassword = generateHash(password);
                        Rol.findOne({
                            where: {nombre: 'usuario'}
                        }).then(function (rol) {
                            if (rol) {
                                var dataPersona =
                                        {
                                            apellidos: req.body.apellidos,
                                            nombres: req.body.nombres,
                                            correo: email,
                                            external_id: uuidv4()
                                        };
                                Persona.create(dataPersona).then(function (newPersona, created) {
                                    if (!newPersona) {
                                        return done(null, false);
                                    }
                                    if (newPersona) {
                                        var data =
                                                {
                                                    usuario: email,
                                                    clave: userPassword,
                                                    id_rol: rol.id,
                                                    id_persona: newPersona.id
                                                };

                                        Cuenta.create(data).then(function (newCuenta, created) {
                                            if (!newCuenta) {
                                                return done(null, false);
                                            }
                                            if (newCuenta) {
                                                return done(null, newCuenta);
                                            }
                                        });
                                    }
                                });
                            } else {
                                return done(null, false, {
                                    message: 'El rol no existe'
                                });
                            }
                        });

                    }
                });
            }
    ));
    
        passport.use('registrarse', new LocalStrategy(
            {
                usernameField: 'email', //lo que esta como name en el input del registro
                passwordField: 'clave', //lo que esta como name en el input del registro
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var generateHash = function (password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                //verificar si el email no esta registrado
                Cuenta.findOne({
                    where: {
                        usuario: email
                    }
                }).then(function (cuenta) {
                    if (cuenta)
                    {
                        return done(null, false, {
                            message: 'El correo ya esta registrado'
                        });

                    } else
                    {
                        var userPassword = generateHash(password);
                        Rol.findOne({
                            where: {nombre: 'usuario'}
                        }).then(function (rol) {
                            if (rol) {
                                var dataPersona =
                                        {
                                            apellidos: req.body.apellidos,
                                            nombres: req.body.nombres,
                                            correo: email,
                                            external_id: uuidv4()
                                        };
                                Persona.create(dataPersona).then(function (newPersona, created) {
                                    if (!newPersona) {
                                        return done(null, false);
                                    }
                                    if (newPersona) {
                                        var data =
                                                {
                                                    usuario: email,
                                                    clave: userPassword,
                                                    id_rol: rol.id,
                                                    id_persona: newPersona.id
                                                };

                                        Cuenta.create(data).then(function (newCuenta, created) {
                                            if (!newCuenta) {
                                                return done(null, false);
                                            }
                                            if (newCuenta) {
                                                return done(null, newCuenta);
                                            }
                                        });
                                    }
                                });
                            } else {
                                return done(null, false, {
                                    message: 'El rol no existe'
                                });
                            }
                        });

                    }
                });
            }
    ));
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                usernameField: 'txt_email',
                passwordField: 'txt_clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var Cuenta = cuenta;

                var isValidPassword = function (userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                };
                Cuenta.findOne({where: {usuario: email}}).then(function (cuenta) {
                    if (!cuenta) {
                        return done(null, false, {message: 'Correo no existe'});
                    }
                    if (!isValidPassword(cuenta.clave, password)) {
                        return done(null, false, {message: 'Clave incorrecta.'});
                    }
                    var userinfo = cuenta.get();
                    return done(null, userinfo);

                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, {message: 'Cuenta erronea'});
                });
            }
    ));
};
