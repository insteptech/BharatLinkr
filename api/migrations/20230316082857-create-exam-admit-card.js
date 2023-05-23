'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examAdmitCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      examId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      examAdmitCardHighlights: {
        type: Sequelize.STRING(100000)
      },
      releaseDate: {
        type: Sequelize.STRING(100000)
      },
      howToDownload: {
        type: Sequelize.STRING(100000)
      },
      sample: {
        type: Sequelize.STRING(100000)
      },
      forgotLoginDetails: {
        type: Sequelize.STRING(100000)
      },
      correction: {
        type: Sequelize.STRING(100000)
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
    await queryInterface.dropTable('examAdmitCards');
  }
};