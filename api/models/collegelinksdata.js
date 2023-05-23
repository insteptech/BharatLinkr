'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeLinksData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeLinksData.init({
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'college',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },

    approval:{type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'collegeLinksData',
    paranoid: false,
    timestamps: true,
  });
  return collegeLinksData;
};