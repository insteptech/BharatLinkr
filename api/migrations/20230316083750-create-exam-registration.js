'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examRegistrations', {
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
      examRegistrationHighlights: {
        type: Sequelize.STRING
      },
      applicationDate: {
        type: Sequelize.STRING
      },
      applicationFees: {
        type: Sequelize.STRING
      },
      eligibility: {
        type: Sequelize.STRING
      },
      documentsRequired: {
        type: Sequelize.STRING
      },
      guide: {
        type: Sequelize.STRING
      },
      applicationFormCorrection: {
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
    await queryInterface.dropTable('examRegistrations');
  }
};