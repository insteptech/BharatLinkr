'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisationCMS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisationCMS.init({
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisation',
        key: 'id',
      },
    },
    glance: DataTypes.STRING(10485760),
    cultureAndValues: DataTypes.STRING(10485760),
    department: DataTypes.STRING(10485760),
    awardsAndRecognisations: DataTypes.STRING(10485760),
    clients: DataTypes.STRING(10485760),
    csr: DataTypes.STRING(10485760),
    testimonials: DataTypes.STRING(10485760),
    companyAddress: DataTypes.STRING(10485760),
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
    modelName: 'organisationCMS',
    paranoid: false,
    timestamps: true,
  });
  return organisationCMS;
};