const { Model, DataTypes } = require('sequelize');

class Pet extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      especie: DataTypes.STRING,
      porte: DataTypes.STRING,
      nascimento: DataTypes.DATE,
      status: DataTypes.STRING,
    },{
      sequelize
    })
  }
}

module.exports = Pet;

