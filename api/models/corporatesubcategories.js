'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class corporateSubCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  corporateSubCategories.init({
    mainCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'corporateMainCategories',
        key: 'id',
      },
    },
    subCategory: DataTypes.STRING,
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
    modelName: 'corporateSubCategories',
    paranoid: false,
    timestamps: true,
  });
  return corporateSubCategories;
};