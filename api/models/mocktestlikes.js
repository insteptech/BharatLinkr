'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mockTestLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  mockTestLikes.init({
    mockTestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mockTest',
        key: 'id',
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    attempts: DataTypes.INTEGER,
    views: DataTypes.INTEGER,

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
    modelName: 'mockTestLikes',
    paranoid: false,
    timestamps: true,
  });
  return mockTestLikes;
};