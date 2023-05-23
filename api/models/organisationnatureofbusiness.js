'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisationNatureOfBusiness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisationNatureOfBusiness.init({
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisation',
        key: 'id',
      },
    },
    natureOfBusiness: DataTypes.STRING(10485760),

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
    modelName: 'organisationNatureOfBusiness',
    paranoid: false,
    timestamps: true,
  });
  return organisationNatureOfBusiness;
};