/* eslint-disable */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const { NODE_ENV } = process.env;
const config = NODE_ENV === 'test'
  ? require(`${__dirname}/../config/config`).test
  : require(`${__dirname}/../config/config`).development;
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
