'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mockTestFAQAnswers', {
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
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mockTestFAQs',
          key: 'id',
        },
      },
      answer: Sequelize.STRING(10485760),
      answerImage: Sequelize.STRING,
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
    await queryInterface.dropTable('mockTestFAQAnswers');
  }
};