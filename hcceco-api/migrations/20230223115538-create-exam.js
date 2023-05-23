module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mainStreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },
      courseTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      courseName: {
        type: Sequelize.STRING,
      },
      courseCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      examModeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      applicationModeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      examApplicationDate: {
        type: Sequelize.STRING,
      },
      examDate: {
        type: Sequelize.STRING,
      },
      resultAnnounceMentDate: {
        type: Sequelize.STRING,
      },
      examLogo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('exams');
  },
};
