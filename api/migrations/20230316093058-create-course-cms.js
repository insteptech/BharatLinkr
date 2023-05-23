'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courseCMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      about: {
        type: Sequelize.STRING(100000)
      },
      specialization: {
        type: Sequelize.STRING(100000)
      },
      eligibility: {
        type: Sequelize.STRING(100000)
      },
      courseAfterDetails: {
        type: Sequelize.STRING(100000)
      },
      career: {
        type: Sequelize.STRING(100000)
      },
      avgFees: {
        type: Sequelize.STRING(100000)
      },
      salaryTrends: {
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
    await queryInterface.dropTable('courseCMs');
  }
};
