'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listOfUsersLikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      categoryTypes: {
        type: Sequelize.ENUM(
            'corporate',
            'mocktest',
            'organisation',
            'college',
        ),
      },
           //this category is for to add the values of corporate, organisation,mocktest,corporate
           categoryId: {
            type: Sequelize.INTEGER
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
    await queryInterface.dropTable('listOfUsersLikes');
  }
};