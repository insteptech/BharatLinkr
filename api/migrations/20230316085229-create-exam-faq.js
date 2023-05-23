'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examFAQs', {
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
      question: {
        type: Sequelize.STRING(100000)
      },
      answer: {
        type: Sequelize.STRING(100000)
      },
      answerType: {
        type: Sequelize.STRING
      },
      image: {
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
    await queryInterface.dropTable('examFAQs');
  }
};