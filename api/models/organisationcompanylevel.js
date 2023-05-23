'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisationCompanyLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisationCompanyLevel.init({
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisation',
        key: 'id',
      },
    },
    companyLevel: DataTypes.STRING(10485760),

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
    modelName: 'organisationCompanyLevel',
    paranoid: false,
    timestamps: true,
  });
  return organisationCompanyLevel;
};