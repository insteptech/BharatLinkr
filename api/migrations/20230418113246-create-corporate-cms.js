'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('corporateCMs', {
     
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      corporateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'corporateRegisters',
          key: 'id',
        },
      },
      about: Sequelize.STRING(10485760),
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
    await queryInterface.dropTable('corporateCMs');
  }
};