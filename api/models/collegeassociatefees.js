'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeAssociateFees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeAssociateFees.init({
    collegeAssociateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'collegeAssociateCourse',
        key: 'id',
      },
    },
    courseFeeDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilter',
        key: 'id',
      },
    },
    fees: DataTypes.INTEGER,
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
    modelName: 'collegeAssociateFees',
    paranoid: false,
    timestamps: true,
  });
  return collegeAssociateFees;
};