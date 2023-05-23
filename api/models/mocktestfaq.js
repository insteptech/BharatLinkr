'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mockTestFAQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  mockTestFAQ.init({
    mockTestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mockTests',
        key: 'id',
      },
    },
    question: {
      type: DataTypes.STRING(1000)
    },
    questionImage: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },


    level: {
      type: DataTypes.STRING
    },

    optionA: {
      type: DataTypes.STRING
    },
    optionAImage: {
      type: DataTypes.STRING
    },
    optionB: {
      type: DataTypes.STRING
    },
    optionBImage: {
      type: DataTypes.STRING
    },
    optionC: {
      type: DataTypes.STRING
    },
    optionCImage: {
      type: DataTypes.STRING
    },
    optionD: {
      type: DataTypes.STRING
    },
    optionDImage: {
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
    modelName: 'mockTestFAQ',
    paranoid: false,
    timestamps: true,
  });
  return mockTestFAQ;
};