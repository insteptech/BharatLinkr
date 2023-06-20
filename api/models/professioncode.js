'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professionCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  professionCode.init({
    familyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'familyCode',
        key: 'id',
      },
    },
    professionCode: DataTypes.STRING,
    professionName: DataTypes.STRING,
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
    modelName: 'professionCode',
    paranoid: false,
    timestamps: true,
  });
  return professionCode;
};