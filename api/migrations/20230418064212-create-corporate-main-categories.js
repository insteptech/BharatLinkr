'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('corporateMainCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mainCategory: {
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
  async down(queryInterface, ) {
    await queryInterface.dropTable('corporateMainCategories');
  }
};