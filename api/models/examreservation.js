'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  examReservation.init({
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    examReservationIntro: {
      type: DataTypes.STRING(100000)
    },
    examReservationHighlights: {
      type: DataTypes.STRING(100000)
    },
    criteria: {
      type: DataTypes.STRING(100000)
    },
    categoryWise: {
      type: DataTypes.STRING(100000)
    },
    forWomen: {
      type: DataTypes.STRING(100000)
    },
    forPWDWomen: {
      type: DataTypes.STRING(100000)
    },
    underEWSQuota: {
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
    modelName: 'examReservation',
    paranoid: false,
    timestamps: true,
  });
  return examReservation;
};