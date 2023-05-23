'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examPreparationTips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examPreparationTips.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    bestTime: {
      type: DataTypes.STRING(100000)
    },
    sectionWisePreparationTips: {
      type: DataTypes.STRING(100000)
    },
    subject1Books: {
      type: DataTypes.STRING(100000)
    },
    subject2Books: {
      type: DataTypes.STRING(100000)
    },
    subject3Books: {
      type: DataTypes.STRING(100000)
    },
    subject4Books: {
      type: DataTypes.STRING(100000)
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
    modelName: 'examPreparationTips',
    paranoid: false,
    timestamps: true,
  });
  return examPreparationTips;
};