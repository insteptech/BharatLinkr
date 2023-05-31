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
 
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organisationGroups',
          key: 'id',
        },
      },

      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organisationBrands',
          key: 'id',
        },
      },
      
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organisationCompanies',
          key: 'id',
        },
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
      plotNumber: {
        type: Sequelize.STRING(100000)
      },
      streetAddress: {
        type: Sequelize.STRING(100000)
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
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
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