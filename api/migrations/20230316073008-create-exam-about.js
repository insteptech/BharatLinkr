'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examAbouts', {
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
      examAboutDefination: {
        type: Sequelize.STRING(100000)
      },
      examAboutHighlights: {
        type: Sequelize.STRING(100000)
      },
      examAboutImportantDates: {
        type: Sequelize.STRING(100000)
      },
      examAboutPattern: {
        type: Sequelize.STRING(100000)
      },
      examAboutSyllabus: {
        type: Sequelize.STRING(100000)
      },
      examAboutImportantBooks: {
        type: Sequelize.STRING(100000)
      },
      examAboutHelpLine: {
        type: Sequelize.STRING(100000)
      },
      examAboutPreviousPapers: {
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
    await queryInterface.dropTable('examAbouts');
  }
};