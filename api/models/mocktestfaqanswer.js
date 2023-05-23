'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mockTestFAQAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  mockTestFAQAnswer.init({
    mockTestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mockTest',
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
    answer: DataTypes.STRING(10485760),
    answerImage: DataTypes.STRING,
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
    modelName: 'mockTestFAQAnswer',
    paranoid: false,
    timestamps: true,
  });
  return mockTestFAQAnswer;
};