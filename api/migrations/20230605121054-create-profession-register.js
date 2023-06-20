'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professionRegisters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      familyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'familyCodes',
          key: 'id',
        },
      },
      professionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'professionCodes',
          key: 'id',
        },
      },
      alsoCalled: {
        type: Sequelize.STRING(100000)
      },
      prepLevel: {
        type: Sequelize.STRING
      },
      highDemandOfProfession: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,

      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
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
    await queryInterface.dropTable('professionRegisters');
  }
};