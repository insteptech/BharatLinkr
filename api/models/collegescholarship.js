'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeScholarShip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeScholarShip.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colleges',
        key: 'id',
      },
    },
    scholarShipIntro: {
      type: DataTypes.STRING(100000)
    },
    basedOnUniExams: {
      type: DataTypes.STRING(100000)
    },
    basedOnAdmissionTest: {
      type: DataTypes.STRING(100000)
    },
    basedOnSportsQuota: {
      type: DataTypes.STRING(100000)
    },
     basedOnDiplomaGraduates: {
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
    modelName: 'collegeScholarShip',
    paranoid: false,
    timestamps: true,
  });
  return collegeScholarShip;
};