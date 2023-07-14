'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisationLikesCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisationLikesCount.init({
    organisationPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisationPost',
        key: 'id',
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    share:{type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: 'organisationLikesCount',
    paranoid: false,
    timestamps: true,
  });
  return organisationLikesCount;
};