'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examRegistration.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examRegistrationHighlights: {
      type: DataTypes.STRING
    },
    applicationDate: {
      type: DataTypes.STRING
    },
    applicationFees: {
      type: DataTypes.STRING
    },
    eligibility: {
      type: DataTypes.STRING
    },
    documentsRequired: {
      type: DataTypes.STRING
    },
    guide: {
      type: DataTypes.STRING
    },
    applicationFormCorrection: {
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
    modelName: 'examRegistration',
    paranoid: false,
    timestamps: true,
  });
  return examRegistration;
};