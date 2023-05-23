'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeAbouts', {
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
      aboutIntro: {
        type: Sequelize.STRING(100000)
      },
      aboutHighLights: {
        type: Sequelize.STRING(100000)
      },
      aboutRankingAndAwards: {
        type: Sequelize.STRING(100000)
      },
      aboutCourses: {
        type: Sequelize.STRING(100000)
      },
      aboutScholarShipPlacements: {
        type: Sequelize.STRING(100000)
      },
      aboutFacilities: {
        type: Sequelize.STRING(100000)
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
    await queryInterface.dropTable('collegeAbouts');
  }
};