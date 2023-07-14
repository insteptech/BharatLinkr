'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organisationLikesCounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userPostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'userPosts',
          key: 'id',
        },
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
  
      share:{type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('organisationLikesCounts');
  }
};