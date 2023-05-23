'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mockTestScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  mockTestScore.init({
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
    marksObtained: DataTypes.INTEGER,
    marksPercentage: DataTypes.FLOAT,
    totalMarks: DataTypes.INTEGER,
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
    modelName: 'mockTestScore',
    paranoid: false,
    timestamps: true,
  });
  return mockTestScore;
};