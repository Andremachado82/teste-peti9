const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Pet = require('../app/models/Pet');


const connection = new Sequelize(dbConfig);

Pet.init(connection);

module.exports = connection;