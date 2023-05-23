'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examPreparationTips', {
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
      bestTime: {
        type: Sequelize.STRING(100000)
      },
      sectionWisePreparationTips: {
        type: Sequelize.STRING(100000)
      },
      subject1Books: {
        type: Sequelize.STRING(100000)
      },
      subject2Books: {
        type: Sequelize.STRING(100000)
      },
      subject3Books: {
        type: Sequelize.STRING(100000)
      },
      subject4Books: {
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
    await queryInterface.dropTable('examPreparationTips');
  }
};