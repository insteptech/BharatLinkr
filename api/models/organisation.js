'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisation.init({
    orgCatgeory: DataTypes.STRING,
    groupName: DataTypes.STRING,

    brandName: DataTypes.STRING,
    companyName: DataTypes.STRING,
  
    typeOfCompany: DataTypes.STRING,
    companySize: DataTypes.STRING,
    establishedYear: DataTypes.INTEGER,
    webSite: DataTypes.STRING,
    competitors: DataTypes.STRING,
    headOffice: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'State',
        key: 'id',
      },
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'City',
        key: 'id',
      },
    },
    contactNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    yourRole: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    companyCover: DataTypes.STRING,
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
    modelName: 'organisation',
    paranoid: false,
    timestamps: true,
  });
  return organisation;
};