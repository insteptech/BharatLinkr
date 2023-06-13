'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organisationPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organisationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'organisations',
          key: 'id',
        },
      },
      postTypes: {
        type: Sequelize.ENUM(
          'script',
          'announcement',
          'jobs',
          'internship',
          'mentoring',
          'question',
          'services',
          'collegefestives',
          'scholarship',
          'culturalevents ',
          'conferences',
          'competitions',
          'hackathon',
          'hiringchallenges',
          'campusrecruitment'

        ),
      },
      title: {
        type: Sequelize.STRING(10485760)
      },
      description: {
        type: Sequelize.STRING(10485760)
      },
      image: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },
      subDepartment: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'subStreams',
          key: 'id',
        },
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'States',
          key: 'id',
        },
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      workMode: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },

      jobRole: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      eligibility: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      college: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'colleges',
          key: 'id',
        },
      },
      course: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      exam: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      corporate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'corporateRegisters',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('organisationPosts');
  }
};