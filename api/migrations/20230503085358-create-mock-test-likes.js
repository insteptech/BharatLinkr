'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mockTestLikes', {
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
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      attempts: Sequelize.INTEGER,
      views: Sequelize.INTEGER,

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
    await queryInterface.dropTable('mockTestLikes');
  }
};