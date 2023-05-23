'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examEligibilities', {
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
      examEligibilityIntro: {
        type: Sequelize.STRING(100000)
      },
      examEligibilityHighlights: {
        type: Sequelize.STRING(100000)
      },
      detailedCriteria: {
        type: Sequelize.STRING(100000)
      },
      marksRequiredForQualifying: {
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
    await queryInterface.dropTable('examEligibilities');
  }
};