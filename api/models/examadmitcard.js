'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examAdmitCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examAdmitCard.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examAdmitCardHighlights: {
      type: DataTypes.STRING(100000)
    },
    releaseDate: {
      type: DataTypes.STRING(100000)
    },
    howToDownload: {
      type: DataTypes.STRING(100000)
    },
    sample: {
      type: DataTypes.STRING(100000)
    },
    forgotLoginDetails: {
      type: DataTypes.STRING(100000)
    },
    correction: {
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
    modelName: 'examAdmitCard',
    paranoid: false,
    timestamps: true,
  });
  return examAdmitCard;
};