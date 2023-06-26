'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masterFilter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masterFilter.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Required',
          },
          len: {
            args: [0, 100],
            msg: 'Name length should be 0-100 letters',
          },
        },
      },
      order: DataTypes.INTEGER,
      image: DataTypes.STRING,
      pdf: DataTypes.STRING(100000),

      description: DataTypes.STRING(100000),
      types: {
        type: DataTypes.ENUM(
          'courselevel',
         
         
        ),
      },
  

      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
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
    modelName: 'masterFilter',
    paranoid: false,
    timestamps: true,
  });
  return masterFilter;
};