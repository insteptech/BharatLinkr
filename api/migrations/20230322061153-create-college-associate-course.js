'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collegeAssociateCourses', {
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
     
      courseTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      courseName: Sequelize.STRING,
    coursePlaceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseDuration: Sequelize.STRING,
    courseEligibility: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseLevel: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    programTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    courseCategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'masterFilters',
        key: 'id',
      },
    },
    chooseExamAcceptedId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'exams',
        key: 'id',
      },
    },
    showOnFiltering: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
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
    await queryInterface.dropTable('collegeAssociateCourses');
  }
};