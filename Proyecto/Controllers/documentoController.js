'use strict';

var models = require('./../models');
var Revista = models.revista;
var Libro = models.libro;
var Articulo = models.articulo;

class documentoController {

    registrarRevista(req, res, next) {
        Revista.findOne({where: {titulo: req.body.v_titulo}}).then(function (documento) {
            if (!documento) {
                var data = {
                    link_imagen: req.body.link_imagen,
                    titulo: req.body.v_titulo,
                    autor: req.body.autor,
                    plataforma: req.body.plataforma,
                    link: req.body.link,
                    id_cuenta: req.user.id
                };
                Revista.create(data).then(function (newDoc, created) {
                    if (newDoc) {
                        res.redirect('/Revista');
                    } else {
                        res.redirect('/guardarRevista');
                    }
                });
            } else {
                console.log("Ya existe");
                res.redirect('/guardarRevista');
            }
        });
    }
    registrarArticulo(req, res, next) {
        Articulo.findOne({where: {titulo: req.body.v_titulo}}).then(function (documento) {
            if (!documento) {
                var data = {
                    link_imagen: req.body.link_imagen,
                    titulo: req.body.v_titulo,
                    autor: req.body.autor,
                    plataforma: req.body.plataforma,
                    link: req.body.link,
                    id_cuenta: req.user.id
                };
                Articulo.create(data).then(function (newDoc, created) {
                    if (newDoc) {
                        res.redirect('/Articulos');
                    } else {
                        res.redirect('/guardarArticulo');
                    }
                });
            } else {
                console.log("Ya existe");
                res.redirect('/guardarArticulo');
            }
        });
    }
    registrarLibro(req, res, next) {
        Libro.findOne({where: {titulo: req.body.v_titulo}}).then(function (documento) {
            if (!documento) {
                var data = {
                    link_imagen: req.body.link_imagen,
                    titulo: req.body.v_titulo,
                    autor: req.body.autor,
                    plataforma: req.body.plataforma,
                    link: req.body.link,
                    id_cuenta: req.user.id
                };
                Libro.create(data).then(function (newDoc, created) {
                    if (newDoc) {
                        res.redirect('/Libros');
                    } else {
                        res.redirect('/guardarLibro');
                    }
                });
            } else {
                console.log("Ya existe");
                res.redirect('/guardarLibro');
            }
        });
    }

    mostrarRevista(req, res, next) {
        Revista.findAll().then(function (documento) {
            res.send(documento);
        });
    }
    mostrarLibro(req, res, next) {
        Libro.findAll().then(function (documento) {
            res.send(documento);
        });
    }
    mostrarArticulo(req, res, next) {
        Articulo.findAll().then(function (documento) {
            res.send(documento);
        });
    }

    editarRevista(req, res, next) {
        Revista.update(
                {link_imagen: req.body.link_imagen,
                    titulo: req.body.v_titulo,
                    autor: req.body.autor,
                    plataforma: req.body.plataforma,
                    link: req.body.link,
                    id_persona: req.user.id},
                {returning: true, where: {id: req.body.id}}
        ).then(function (rowsUpdate) {
            res.redirect('/Revista');
        })
                .catch(next);
    }

    editarLibro(req, res, next) {
        Libro.update(
                {link_imagen: req.body.link_imagen,
                    titulo: req.body.v_titulo,
                    autor: req.body.autor,
                    plataforma: req.body.plataforma,
                    link: req.body.link,
                    id_persona: req.user.id},
                {returning: true, where: {id: req.body.id}}
        )
                .then(function (rowsUpdate) {
                    res.redirect('/Libros');
                })
                .catch(next);
    }

    editarArticulo(req, res, next) {
        Articulo.update(
                {link_imagen: req.body.link_imagen,
                    titulo: req.body.v_titulo,
                    autor: req.body.autor,
                    plataforma: req.body.plataforma,
                    link: req.body.link,
                    id_persona: req.user.id},
                {returning: true, where: {id: req.body.id}}
        )
                .then(function (rowsUpdate) {
                    res.redirect('/Articulos');
                })
                .catch(next);
    }
    eliminarRevista(req, res, next) {
        Revista.destroy({where: {id: req.body.id_doc}}).then(function (rowsDelete) {
    
            res.redirect('/Revista');
        }).catch(next);
    }
    eliminarLibro(req, res, next) {

        Libro.destroy({where: {id: req.body.id_doc}}).then(function (rowsDelete) {
            res.redirect('/Libros');
        }).catch(next);
    }
    eliminarArticulo(req, res, next) {

        Articulo.destroy({where: {id: req.body.id_doc}}).then(function (rowsDelete) {
            res.redirect('/Articulos');
        }).catch(next);
    }
    
    
}
module.exports = documentoController;


