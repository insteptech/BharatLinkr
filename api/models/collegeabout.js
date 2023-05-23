'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeAbout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeAbout.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    aboutIntro: {
      type: DataTypes.STRING(100000)
    },
    aboutHighLights: {
      type: DataTypes.STRING(100000)
    },
    aboutRankingAndAwards: {
      type: DataTypes.STRING(100000)
    },
    aboutCourses: {
      type: DataTypes.STRING(100000)
    },
    aboutScholarShipPlacements: {
      type: DataTypes.STRING(100000)
    },
    aboutFacilities: {
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
    modelName: 'collegeAbout',
    paranoid: false,
    timestamps: true,
  });
  return collegeAbout;
};