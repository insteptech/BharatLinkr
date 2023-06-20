'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organisationCMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organisationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organisations',
          key: 'id',
        },
      },
      glance: {
        type: Sequelize.STRING(10485760)
      },
      cultureAndValues: {
        type: Sequelize.STRING(10485760)
      },
      department: {
        type: Sequelize.STRING(10485760)
      },
      awardsAndRecognisations: {
        type: Sequelize.STRING(10485760)
      },
      clients: {
        type: Sequelize.STRING(10485760)
      },
      csr: {
        type: Sequelize.STRING(10485760)
      },
      testimonials: {
        type: Sequelize.STRING(10485760)
      },
      companyAddress: {
        type: Sequelize.STRING(10485760)
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
    await queryInterface.dropTable('organisationCMs');
  }
};