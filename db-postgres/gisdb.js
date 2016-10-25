const Sequelize = require('sequelize');

const sequelize = new Sequelize('gisdb', 'Martin', 'pw', {
  host: 'localhost',
  dialect: 'postgres'
});