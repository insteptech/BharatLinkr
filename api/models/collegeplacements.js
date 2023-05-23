'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegePlacements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegePlacements.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    placeMentIntro: {
      type: DataTypes.STRING(100000)
    },
    highLights2021: {
      type: DataTypes.STRING(100000)
    },
    MBAhighLights: {
      type: DataTypes.STRING(100000)
    },
    BTECHhighLights: {
      type: DataTypes.STRING(100000)
    },
    yearWisePlaceMents: {
      type: DataTypes.STRING(100000)
    },
    topRecruiters: {
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
    modelName: 'collegePlacements',
    paranoid: false,
    timestamps: true,
  });
  return collegePlacements;
};