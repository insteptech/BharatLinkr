/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFile = require('../config/config');

const basename = path.basename(__filename);

const config = configFile.development;

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.sequelize = sequelize;

db.User.belongsTo(db.Role, { foreignKey: 'roleId' });
// db.RolePermission.belongsTo(db.Permission, { as: 'permissions', foreignKey: 'permissionId' });
db.State.belongsTo(db.Countries, { as: "Countries", foreignKey: 'countryId' });

db.City.belongsTo(db.State, { as: "State", foreignKey: 'stateId' });

db.subStream.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' });
db.colStream.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' });
db.colStream.belongsTo(db.subStream, { as: "SubStream", foreignKey: 'subStreamId' });






module.exports = db;
