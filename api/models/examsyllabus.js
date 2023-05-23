'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examSyllabus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examSyllabus.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examSyllabusHighlights: {
      type: DataTypes.STRING(100000)
    },
    examSyllabusPaper1Pattern: {
      type: DataTypes.STRING(100000)
    },
    examSyllabusPaper2Pattern: {
      type: DataTypes.STRING(100000)
    },
    examSyllabusPaper3Pattern: {
      type: DataTypes.STRING(100000)
    },
    examSyllabusPaper4Pattern: {
      type: DataTypes.STRING(100000)
    },
    examSyllabusPaper5Pattern: {
      type: DataTypes.STRING(100000)
    },
    examSyllabusPaper6Pattern: {
      type: DataTypes.STRING(100000)
    },
    bestBooks: {
      type: DataTypes.STRING(100000)
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      paranoid: false,
      timestamps: true,
    },
  }, {
    sequelize,
    modelName: 'examSyllabus',
    paranoid: false,
    timestamps: true,
  });
  return examSyllabus;
};