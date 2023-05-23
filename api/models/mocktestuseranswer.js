'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mockTestUserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  mockTestUserAnswer.init({
    mockTestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mockTest',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    attemptId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mockTestScore',
        key: 'id',
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mockTestFAQ',
        key: 'id',
      },
    },
    answer: DataTypes.STRING,
    correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'mockTestUserAnswer',
    paranoid: false,
    timestamps: true,
  });
  return mockTestUserAnswer;
};