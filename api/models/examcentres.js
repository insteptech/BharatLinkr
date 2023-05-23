'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examCentres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examCentres.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examCentreIntro: {
      type: DataTypes.STRING(100000)
    },
    listOfExamCentres: {
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
    modelName: 'examCentres',
    paranoid: false,
    timestamps: true,
  });
  return examCentres;
};