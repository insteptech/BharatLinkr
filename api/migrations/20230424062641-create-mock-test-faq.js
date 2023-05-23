'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mockTestFAQs', {
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
      question: {
        type: Sequelize.STRING(1000)
      },
      questionImage: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
  
  
      optionA: {
        type: Sequelize.STRING
      },
      optionAImage: {
        type: Sequelize.STRING
      },
      optionB: {
        type: Sequelize.STRING
      },
      optionBImage: {
        type: Sequelize.STRING
      },
      optionC: {
        type: Sequelize.STRING
      },
      optionCImage: {
        type: Sequelize.STRING
      },
      optionD: {
        type: Sequelize.STRING
      },
      optionDImage: {
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
    await queryInterface.dropTable('mockTestFAQs');
  }
};