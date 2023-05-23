'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeAgencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collegeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colleges',
          key: 'id',
        },
      },
      collegeAgencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      collegeAgencyFor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },
      totalAgency: Sequelize.STRING,
      totalAgencyForYears: Sequelize.STRING,
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
    await queryInterface.dropTable('collegeAgencies');
  }
};