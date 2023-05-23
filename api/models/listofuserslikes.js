'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listOfUsersLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  listOfUsersLikes.init({

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },

    categoryTypes: {
      type: DataTypes.ENUM(
          'corporate',
          'mocktest',
          'organisation',
          'college',
      ),
    },
        //this category is for to add the values of corporate, organisation,mocktest,corporate
        categoryId: DataTypes.INTEGER,
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
    modelName: 'listOfUsersLikes',
    paranoid: false,
    timestamps: true,
  });
  return listOfUsersLikes;
};