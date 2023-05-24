module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userType: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      designation: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      mobileNumber: {
        type: Sequelize.STRING,
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'States',
          key: 'id',
        },
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      school_college_company: {
        type: Sequelize.STRING,
      },
      highestEducation: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.STRING,
      },
      areaOfExpertise: {
        type: Sequelize.STRING,
      },
      accomplishments: {
        type: Sequelize.STRING,
      },
      totalExperience: {
        type: Sequelize.STRING,
      },
      profilePhoto: {
        type: Sequelize.STRING,
      },
      coverPhoto: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      otp: {
        type: Sequelize.INTEGER,
      },
      ExpiresAt: {
        type: Sequelize.DATE,
      },
      collegeWebsite: {
        type: Sequelize.STRING,
      },
      collegeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'colleges',
          key: 'id',
        },
      },
      isNumberVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
