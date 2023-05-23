const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  State.init(
    {
      state: {
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
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Countries',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'State',
      paranoid: false,
      timestamps: true,
    }
  );
  return State;
};
