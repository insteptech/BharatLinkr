'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professionCMS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  professionCMS.init({
    professionRegisterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professionRegister',
        key: 'id',
      },
    },
    glance: DataTypes.STRING(10485760),
    types: DataTypes.STRING(10485760),
    tasks: DataTypes.STRING(10485760),
    education: DataTypes.STRING(10485760),
    experience: DataTypes.STRING(10485760),
    knowledge: DataTypes.STRING(10485760),
    technicalSkills: DataTypes.STRING(10485760),
    futureProspects: DataTypes.STRING(10485760),
    certificates: DataTypes.STRING(10485760),
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
    modelName: 'professionCMS',
    paranoid: false,
    timestamps: true,
  });
  return professionCMS;
};