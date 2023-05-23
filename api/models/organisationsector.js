'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisationSector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisationSector.init({
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisation',
        key: 'id',
      },
    },
    sectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sector',
        key: 'id',
      },
    },
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
    modelName: 'organisationSector',
    paranoid: false,
    timestamps: true,
  });
  return organisationSector;
};