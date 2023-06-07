'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class familyCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  familyCode.init({
    familyCode: DataTypes.INTEGER,
    familyName: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    
    },
  }, {
    sequelize,
    modelName: 'familyCode',
    paranoid: false,
    timestamps: true,
  });
  return familyCode;
};