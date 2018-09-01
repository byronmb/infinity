module.exports = function (sequelize, Sequelize) {
    var Persona = sequelize.define('persona', {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       apellidos: {
           type: Sequelize.STRING (60),
           notEmpty: true
       },
       nombres: {
           type: Sequelize.STRING (60)
       },
       correo: {
           type: Sequelize.STRING (60),
           validate: {
               isEmail: {args: true, msg: 'No es un correo electronico valido'}
           }
       },
       external_id: {
           type: Sequelize.UUID
       }
    });
    Persona.associate = function (models) {
        models.persona.hasOne(models.cuenta, {            
            foreignKey: 'id_persona'
        });
    };
    return Persona;
};