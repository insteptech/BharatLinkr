'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masterFilters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: {
            args: true,
            msg: 'Required',
          },
          len: {
            args: [0, 100],
            msg: 'Name length should be 0-100 letters',
          },
        },
      },
      order: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      pdf: {
        type: Sequelize.STRING(100000),
      },
      description: {
        type: Sequelize.STRING(100000),
      },
      types: {
        type: Sequelize.ENUM(
          'courselevel',
         
         
          
         
        ),
      },

      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
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
    await queryInterface.dropTable('masterFilters');
  }
};