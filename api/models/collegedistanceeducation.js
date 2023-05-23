'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeDistanceEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeDistanceEducation.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    basicInfo: {
      type: DataTypes.STRING(100000)
    },
    courseDetails: {
      type: DataTypes.STRING(100000)
    },
    honors: {
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
    modelName: 'collegeDistanceEducation',
    paranoid: false,
    timestamps: true,
  });
  return collegeDistanceEducation;
};