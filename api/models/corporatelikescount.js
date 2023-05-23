'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class corporateLikesCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  corporateLikesCount.init({
    corporateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'corporateRegister',
        key: 'id',
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downloads:{type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views:{type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: 'corporateLikesCount',
    paranoid: false,
    timestamps: true,
  });
  return corporateLikesCount;
};