'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professionRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  professionRegister.init({
    familyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'familyCode',
        key: 'id',
      },
    },
    professionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professionCode',
        key: 'id',
      },
    },
    alsoCalled: DataTypes.STRING(100000),
    prepLevel: DataTypes.STRING,
    highDemandOfProfession: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,

    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id',
      },
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
    modelName: 'professionRegister',
    paranoid: false,
    timestamps: true,
  });
  return professionRegister;
};