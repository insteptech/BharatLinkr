'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeAgency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeAgency.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    collegeAgencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    collegeAgencyFor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mainStreams',
        key: 'id',
      },
    },
    totalAgency: DataTypes.STRING,
    totalAgencyForYears: DataTypes.STRING,
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
    modelName: 'collegeAgency',
    paranoid: false,
    timestamps: true,
  });
  return collegeAgency;
};