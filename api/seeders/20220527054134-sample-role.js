module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 1,
          key: 'superadmin',
          title: 'Super Admin',
          order: 1,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 2,
          key: 'admin',
          title: 'admin',
          order: 2,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 3,
          key: 'user',
          title: 'User',
          order: 3,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 4,
          key: 'college',
          title: 'College',
          order: 4,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 5,
          key: 'student',
          title: 'Student',
          order: 5,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 6,
          key: 'organisation',
          title: 'Organisation',
          order: 6,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 7,
          key: 'mentor',
          title: 'Mentor',
          order: 7,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
        {
          id: 8,
          key: 'workingProfessional',
          title: 'Working Professional',
          order: 8,
          createdAt: '2021-09-24 16:52:31.814+05:30',
          updatedAt: '2021-09-24 16:52:31.814+05:30',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
