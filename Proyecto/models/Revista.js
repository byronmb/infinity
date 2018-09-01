module.exports = function (sequelize, Sequelize) {
    var aux = require('./cuenta');
    var Cuenta = new aux(sequelize, Sequelize);
    var Revista = sequelize.define('revista', {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       link_imagen: {
           type: Sequelize.STRING (2000),
           notEmpty: true
       },
       titulo: {
           type: Sequelize.STRING (200),
           notEmpty: true
       },
       autor: {
           type: Sequelize.STRING (200),
           notEmpty: true
       },
       plataforma: {
           type: Sequelize.STRING (100),
           notEmpty: true
       },
       link: {
           type: Sequelize.STRING (2000),
           notEmpty: true
       },
       external_id: {
           type: Sequelize.UUID
       }
    });
    Revista.belongsTo(Cuenta, {foreignKey: 'id_cuenta',constraints: false});
    return Revista;
};


