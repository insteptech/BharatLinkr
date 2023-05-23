'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseCMS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  courseCMS.init({
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    },
    about: DataTypes.STRING(100000),
    specialization: DataTypes.STRING(100000),
    eligibility: DataTypes.STRING(1000000),
    courseAfterDetails: DataTypes.STRING(100000),
    career: DataTypes.STRING(100000),
    avgFees: DataTypes.STRING(100000),
    salaryTrends: DataTypes.STRING(100000),
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
    modelName: 'courseCMS',
    paranoid: false,
    timestamps: true
  });
  return courseCMS;
};