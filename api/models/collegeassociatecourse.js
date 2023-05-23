'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeAssociateCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeAssociateCourse.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    
    courseTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseName: DataTypes.STRING,
    coursePlaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseDuration: DataTypes.STRING,
    courseEligibility: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    programTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    chooseExamAcceptedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exam',
        key: 'id',
      },
    },
    showOnFiltering: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: 'collegeAssociateCourse',
    paranoid: false,
    timestamps: true,
  });
  return collegeAssociateCourse;
};