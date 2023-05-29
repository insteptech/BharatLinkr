const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init(
    {
      userType: DataTypes.STRING,
      name: DataTypes.STRING,
      designation: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
      },
      mobileNumber: DataTypes.STRING,
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'States',
          key: 'id',
        },
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      school_college_company: DataTypes.STRING,
      highestEducation: DataTypes.STRING,
      summary: DataTypes.STRING,
      areaOfExpertise: DataTypes.STRING,
      accomplishments: DataTypes.STRING,
      totalExperience: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      coverPhoto: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Role',
          key: 'id',
        },
      },
      otp: DataTypes.INTEGER,
      ExpiresAt: {
        type: DataTypes.DATE,
      },
      collegeWebsite: DataTypes.STRING,
      collegeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'colleges',
          key: 'id',
        },
      },
      isNumberVerified: {
        type: DataTypes.BOOLEAN,
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
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: false,
      timestamps: true,
    }
  );
  return User;
};