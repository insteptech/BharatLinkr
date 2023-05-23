'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('corporateRegisters', {
     
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mainCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'corporateMainCategories',
          key: 'id',
        },
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'corporateSubCategories',
          key: 'id',
        },
      },
      topicName: {
        type: Sequelize.STRING(1000)
      },
      subTopic: {
        type: Sequelize.STRING(1000)   
        },
        feildName: {
          type: Sequelize.STRING(1000)   
          },
        pdf: {
          type: Sequelize.STRING(1000)   
          },
          views: {
            type: Sequelize.INTEGER
            },
            downloads: {
              type: Sequelize.INTEGER
              },
              likes: {
                type: Sequelize.INTEGER
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
    await queryInterface.dropTable('corporateRegisters');
  }
};