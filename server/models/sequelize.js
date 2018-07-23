const config = require('../config/config');

const Sequelize = require('sequelize');
const {name, password, port, user, dialect, host} = config.db;

let sequelize = new Sequelize( name, user, password, {
  dialect,
  host,
  port,
  define: {
    timestamps: false
  }
});


const models = {
  Users: sequelize.import('./Users'),
  Boards: sequelize.import('./Boards'),
  Tasks: sequelize.import('./Tasks'),
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;