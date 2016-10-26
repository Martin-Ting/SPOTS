const Sequelize = require('sequelize');

const sequelize = new Sequelize('gisdb', 'Martin', 'pw', {
  host: 'localhost',
  dialect: 'postgres'
});

function GISDatabase() {
  let sequelize;
  let dbname = 'gisdb';
  let models = {};
  this.models = models;

  this.getDialect = function(){
    return 'postgres';
  }

  this.initialize = function (){
    sequelize = connectToPostgreSQL();
    initializeModels();
    return syncDatabase();
  }

  function connectToPostgreSQL(){
    return new Sequelize(dbname, 'Martin', 'pw', { host: 'localhost', dialect: this.getDialect() });
  }

  function initializeModels(){
    const Spots = sequelize.define('Spots', {
      id:{
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      point: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      }
    });

    models[Spots.name] = Spots;
  }

  function syncDatabase(){
    return sequelize.sync();
  }
}


module.exports = new GISDatabase();