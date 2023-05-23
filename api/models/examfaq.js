'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examFAQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examFAQ.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    question: {
      type: DataTypes.STRING(100000)
    },
    answer: {
      type: DataTypes.STRING(100000)
    },
    answerType: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
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
    modelName: 'examFAQ',
    paranoid: false,
    timestamps: true,
  });
  return examFAQ;
};