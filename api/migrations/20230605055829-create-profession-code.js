'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professionCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      familyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'familyCodes',
          key: 'id',
        },
      },
      professionCode: {
        type: Sequelize.STRING
      },
      professionName: {
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
    await queryInterface.dropTable('professionCodes');
  }
};