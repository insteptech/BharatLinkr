'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegePosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegePosts.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'college',
        key: 'id',
      },
    },
    posts: DataTypes.STRING(10485760),
    image: DataTypes.STRING,
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
    modelName: 'collegePosts',
    paranoid: false,
    timestamps: true,
  });
  return collegePosts;
};