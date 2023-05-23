'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examAbout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examAbout.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examAboutDefination: {
      type: DataTypes.STRING(100000)
    },
    examAboutHighlights: {
      type: DataTypes.STRING(100000)
    },
    examAboutImportantDates: {
      type: DataTypes.STRING(100000)
    },
    examAboutPattern: {
      type: DataTypes.STRING(100000)
    },
    examAboutSyllabus: {
      type: DataTypes.STRING(100000)
    },
    examAboutImportantBooks: {
      type: DataTypes.STRING(100000)
    },
    examAboutHelpLine: {
      type: DataTypes.STRING(100000)
    },
    examAboutPreviousPapers: {
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
    modelName: 'examAbout',
    paranoid: false,
    timestamps: true,
  });
  return examAbout;
};