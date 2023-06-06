'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('familyCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      familyCode: {
        type: Sequelize.INTEGER
      },
      familyName: {
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
    await queryInterface.dropTable('familyCodes');
  }
};