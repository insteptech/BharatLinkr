'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organisations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orgCatgeory: {
        type: Sequelize.STRING
      },
      groupName: {
        type: Sequelize.STRING
      },

      brandName: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },

  
  
      typeOfCompany: {
        type: Sequelize.STRING
      },
      companySize: {
        type: Sequelize.STRING
      },
      establishedYear: {
        type: Sequelize.INTEGER
      },
      webSite: {
        type: Sequelize.STRING
      },
      competitors: {
        type: Sequelize.STRING
      },
      headOffice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
          key: 'id',
        },
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
 
      contactNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      yourRole: {
        type: Sequelize.STRING
      },
      companyLogo: {
        type: Sequelize.STRING
      },
      companyCover: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('organisations');
  }
};