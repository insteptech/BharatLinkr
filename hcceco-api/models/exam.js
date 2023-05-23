const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  exam.init(
    {
      mainStreamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },
      courseTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      examName: {
        type: DataTypes.STRING,
      },
      examTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      examModeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      applicationModeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      examApplicationDate: {
        type: DataTypes.STRING,
      },
      examDate: {
        type: DataTypes.STRING,
      },
      resultAnnounceMentDate: {
        type: DataTypes.STRING,
      },
      examLogo: {
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
      modelName: 'exam',
      paranoid: false,
      timestamps: true,
    }
  );
  return exam;
};
