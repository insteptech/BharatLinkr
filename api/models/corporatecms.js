'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class corporateCMS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  corporateCMS.init({
    corporateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'corporateRegisters',
        key: 'id',
      },
    },
    about: DataTypes.STRING(10485760),
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
    modelName: 'corporateCMS',
    paranoid: false,
    timestamps: true,
  });
  return corporateCMS;
};