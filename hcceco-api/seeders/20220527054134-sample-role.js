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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
