'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeScholarShips', {
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
      scholarShipIntro: {
        type: Sequelize.STRING(100000)
      },
      basedOnUniExams: {
        type: Sequelize.STRING(100000)
      },
      basedOnAdmissionTest: {
        type: Sequelize.STRING(100000)
      },
      basedOnSportsQuota: {
        type: Sequelize.STRING(100000)
      },
       basedOnDiplomaGraduates: {
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
    await queryInterface.dropTable('collegeScholarShips');
  }
};