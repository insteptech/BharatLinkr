module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('colleges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chooseAffiliationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      collegeName: {
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
      collegeMailId: {
        type: Sequelize.STRING,
      },
      collegeTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      collegeEstablishedDate: {
        type: Sequelize.STRING,
      },
      chooseApprovalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      collegeStateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
          key: 'id',
        },
      },
      collegeCityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      
      collegeNaacGrade: {
        type: Sequelize.STRING,
      },
      collegeStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'id',
        },
      },
      collegeLogo: {
        type: Sequelize.STRING,
      },
      collegeImage: {
        type: Sequelize.STRING,
      },
      isSponsered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('colleges');
  },
};
