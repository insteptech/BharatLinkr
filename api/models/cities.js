const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING(100),
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
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
          key: 'id',
        },
      },
    },

    {
      sequelize,
      modelName: 'City',
      paranoid: false,
      timestamps: true,
    }
  );

  return City;
};
