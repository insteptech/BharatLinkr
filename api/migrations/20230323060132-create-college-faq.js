'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeFAQs', {
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
      courseAndFee: {
        type: Sequelize.STRING(100000)
      },
      scholarShip: {
        type: Sequelize.STRING(100000)
      },
      placeMents: {
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
  async down(queryInterface, ) {
    await queryInterface.dropTable('collegeFAQs');
  }
};