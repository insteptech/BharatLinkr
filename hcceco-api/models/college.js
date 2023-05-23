const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class college extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  college.init(
    {
      chooseAffiliationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      collegeName: {
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
      collegeMailId: DataTypes.STRING,
      collegeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      collegeEstablishedDate: DataTypes.STRING,
      chooseApprovalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      collegeStateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
          key: 'id',
        },
      },
      collegeCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      collegeAgencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      collegeNaacGrade: DataTypes.STRING,
      collegeStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'id',
        },
      },
      collegeLogo: DataTypes.STRING,
      collegeImage: DataTypes.STRING,
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'college',
      paranoid: false,
      timestamps: true,
    }
  );
  return college;
};
