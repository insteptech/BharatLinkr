'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mockTestUserAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mockTestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mockTests',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      attemptId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'mockTestScores',
          key: 'id',
        },
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mockTestFAQs',
          key: 'id',
        },
      },
      answer: Sequelize.STRING,
      correct: {
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('mockTestUserAnswers');
  }
};