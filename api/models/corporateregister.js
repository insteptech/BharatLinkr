'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class corporateRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  corporateRegister.init({

    mainCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'corporateMainCategories',
        key: 'id',
      },
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'corporateSubCategories',
        key: 'id',
      },
    },
    topicName: {
      type: DataTypes.STRING(1000)
    },
    subTopic: {
      type: DataTypes.STRING(1000)   
      },
      feildName: {
        type: DataTypes.STRING(1000)   
        },
      pdf: {
        type: DataTypes.STRING(1000)   
        },
        views: {
          type: DataTypes.INTEGER
          },
          downloads: {
            type: DataTypes.INTEGER
            },
            likes: {
              type: DataTypes.INTEGER
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
    modelName: 'corporateRegister',
    paranoid: false,
    timestamps: true,
  });
  return corporateRegister;
};