'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examReservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      examId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      examReservationIntro: {
        type: Sequelize.STRING(100000)
      },
      examReservationHighlights: {
        type: Sequelize.STRING(100000)
      },
      criteria: {
        type: Sequelize.STRING(100000)
      },
      categoryWise: {
        type: Sequelize.STRING(100000)
      },
      forWomen: {
        type: Sequelize.STRING(100000)
      },
      forPWDWomen: {
        type: Sequelize.STRING(100000)
      },
      underEWSQuota: {
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
    await queryInterface.dropTable('examReservations');
  }
};