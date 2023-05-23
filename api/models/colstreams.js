const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class colStream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  colStream.init(
    {
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
      colStreamName: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'colStream',
      paranoid: false,
      timestamps: true,
    }
  );
  return colStream;
};
