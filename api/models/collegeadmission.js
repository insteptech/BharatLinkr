'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeAdmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeAdmission.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    admissionIntro: {
      type: DataTypes.STRING(100000)
    },
    admissionAboutTest: {
      type: DataTypes.STRING(100000)
    },
    admissionImportantDates: {
      type: DataTypes.STRING(100000)
    },
    admissionHighLights: {
      type: DataTypes.STRING(100000)
    },
    applicationProcess: {
      type: DataTypes.STRING(100000)
    },
    PHDadmissionProcess: {
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
    modelName: 'collegeAdmission',
    paranoid: false,
    timestamps: true,
  });
  return collegeAdmission;
};