module.exports = function (sequelize, Sequelize) {
    var aux = require('./persona');
    var Persona = new aux(sequelize, Sequelize);
    var rol = require('./Rol');
    var Rol = new rol(sequelize, Sequelize);
    var Cuenta = sequelize.define('cuenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        usuario: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        clave: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    Cuenta.associate = function (models) {
        models.cuenta.hasMany(models.revista, {            
            foreignKey: 'id_cuenta'
        });
        models.cuenta.hasMany(models.libro, {            
            foreignKey: 'id_cuenta'
        });
        models.cuenta.hasMany(models.articulo, {            
            foreignKey: 'id_cuenta'
        });
      
    };
    Cuenta.belongsTo(Persona, {foreignKey: 'id_persona',constraints: false});
    Cuenta.belongsTo(Rol, {foreignKey: 'id_rol',constraints: false});
    return Cuenta;
};

