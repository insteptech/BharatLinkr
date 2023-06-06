'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professionCMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      professionRegisterId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'professionRegisters',
          key: 'id',
        },
      },
      glance: {
        type: Sequelize.STRING(10485760)
      },
      types: {
        type: Sequelize.STRING(10485760)
      },
      tasks: {
        type: Sequelize.STRING(10485760)
      },
      education: {
        type: Sequelize.STRING(10485760)
      },
      experience: {
        type: Sequelize.STRING(10485760)
      },
      knowledge: {
        type: Sequelize.STRING(10485760)
      },
      technicalSkills: {
        type: Sequelize.STRING(10485760)
      },
      futureProspects: {
        type: Sequelize.STRING(10485760)
      },
      certificates: {
        type: Sequelize.STRING(10485760)
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
    await queryInterface.dropTable('professionCMs');
  }
};