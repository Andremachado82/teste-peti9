"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pets", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true        
      },
      especie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      porte: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nascimento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status : {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Ativo",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("pets");
  }
};
