module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MasterTypes', {
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
          'programtype',
          'discipline',
          'schoolaffilation',
          'gradesystem',
          'schoollevel',
          'schooldesignation',
          'schoolmedium',
          'teacherlevels',
          'programduration',
          'collegetype',
          'accreditation',
          'affilation',
          'examaccepted',
          'facilities',
          'coursecategory',
          'coursetype',
          'collegecategory',
          'category',
          'collegeuniversitytype',
          'examtype',
          'applicationmode',
          'exammode',
          'examother',
          'ranking',
          'institutetype',
          'internationalcollaboration',
          'exampattern',
          'applicationexamstatus',
          'academiclevel',
          'qualification',
          'fieldofstudy',
          // 'specialization',
          'entranceexamaccepted',
          'courseduration',
          'studymode',
          'eligbilitycriteria',
          'examduration',
          'rankingtype',
          'examdurationtype',
          'qualificationcriteria',
          'headofinstitute',
          'campus',
          'preparatoryexams',
          'agency',
          'ratings',
          'department',
          'coursetype',
          'coursefeetype',
          'courseplace',
          'approvals',
          'collegeagency'
         
        ),
      },
      minimumQualificationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'MasterTypes',
          key: 'id',
        },
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('MasterTypes');
  },
};
