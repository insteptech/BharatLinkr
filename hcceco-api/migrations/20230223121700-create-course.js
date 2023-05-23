module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
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
      eligibility: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      courseDurationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
      },
      averageFees: {
        type: Sequelize.STRING,
      },
      averageSalary: {
        type: Sequelize.STRING,
      },
      entranceExamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      programTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
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
    await queryInterface.dropTable('courses');
  },
};
