'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeAssociateStream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  collegeAssociateStream.init({
    collegeAssociateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'collegeAssociateCourses',
        key: 'id',
      },
    },
    mainStreamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mainStreams',
        key: 'id',
      },
    },
    subStreamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subStreams',
        key: 'id',
      },
    },
    colStreamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colStreams',
        key: 'id',
      },
    },
    courseFeeDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseFee: DataTypes.INTEGER,
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
    modelName: 'collegeAssociateStream',
    paranoid: false,
    timestamps: true,
  });
  return collegeAssociateStream;
};