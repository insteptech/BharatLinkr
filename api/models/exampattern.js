'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examPattern extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examPattern.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examPatternHighlights: {
      type: DataTypes.STRING(100000)
    },
    examPatternPaper1Pattern: {
      type: DataTypes.STRING(100000)
    },
    examPatternPaper2Pattern: {
      type: DataTypes.STRING(100000)
    },
    examPatternPaper3Pattern: {
      type: DataTypes.STRING(100000)
    },
    examPatternPaper4Pattern: {
      type: DataTypes.STRING(100000)
    },
    examPatternPaper5Pattern: {
      type: DataTypes.STRING(100000)
    },
    examPatternPaper6Pattern: {
      type: DataTypes.STRING(100000)
    },
    weightage: {
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
    modelName: 'examPattern',
    paranoid: false,
    timestamps: true,
  });
  return examPattern;
};