'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
          model: 'masterFilters',
          key: 'id',
        },
      },
      examName: {
        type: Sequelize.STRING
      },
      examTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      examModeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      applicationModeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      examApplicationDate: {
        type: Sequelize.STRING
      },
      examDate: {
        type: Sequelize.STRING
      },
      resultAnnouncementDate: {
        type: Sequelize.STRING
      },
      examLogo: {
        type: Sequelize.STRING
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('exams');
  }
};