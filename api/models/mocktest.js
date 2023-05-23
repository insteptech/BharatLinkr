'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mockTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  mockTest.init({
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
        totalMarksOfTest: {
          type: DataTypes.INTEGER 
          },
          questionMarks: {
            type: DataTypes.INTEGER 
            },
            totalTime: {
              type: DataTypes.INTEGER 
              },
              totalQuestions: {
                type: DataTypes.INTEGER 
                },
                active: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: true,
                },
                deleted: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false,
                }
  }, {
    sequelize,
    modelName: 'mockTest',
    paranoid: false,
    timestamps: true,
  });
  return mockTest;
};