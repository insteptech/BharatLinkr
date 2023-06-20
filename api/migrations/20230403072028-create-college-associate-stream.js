'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeAssociateStreams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collegeAssociateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'collegeAssociateCourses',
          key: 'id',
        },
      },
      mainStreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },
      subStreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subStreams',
          key: 'id',
        },
      },
      colStreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colStreams',
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
    await queryInterface.dropTable('collegeAssociateStreams');
  }
};