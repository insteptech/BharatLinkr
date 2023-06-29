'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userFriendLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recieverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      status: {
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
    await queryInterface.dropTable('userFriendLists');
  }
};