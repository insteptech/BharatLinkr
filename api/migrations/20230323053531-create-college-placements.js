'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegePlacements', {
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
      placeMentIntro: {
        type: Sequelize.STRING(100000)
      },
      highLights2021: {
        type: Sequelize.STRING(100000)
      },
      MBAhighLights: {
        type: Sequelize.STRING(100000)
      },
      BTECHhighLights: {
        type: Sequelize.STRING(100000)
      },
      yearWisePlaceMents: {
        type: Sequelize.STRING(100000)
      },
      topRecruiters: {
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
    await queryInterface.dropTable('collegePlacements');
  }
};