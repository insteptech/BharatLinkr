'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeAdmissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collegeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colleges',
          key: 'id',
        },
      },
      admissionIntro: {
        type: Sequelize.STRING(100000)
      },
      admissionAboutTest: {
        type: Sequelize.STRING(100000)
      },
      admissionImportantDates: {
        type: Sequelize.STRING(100000)
      },
      admissionHighLights: {
        type: Sequelize.STRING(100000)
      },
      applicationProcess: {
        type: Sequelize.STRING(100000)
      },
      PHDadmissionProcess: {
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
    await queryInterface.dropTable('collegeAdmissions');
  }
};