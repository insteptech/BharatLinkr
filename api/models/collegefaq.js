'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeFAQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeFAQ.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
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
    courseAndFee: {
      type: DataTypes.STRING(100000)
    },
    scholarShip: {
      type: DataTypes.STRING(100000)
    },
    placeMents: {
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
    modelName: 'collegeFAQ',
    paranoid: false,
    timestamps: true,
  });
  return collegeFAQ;
};