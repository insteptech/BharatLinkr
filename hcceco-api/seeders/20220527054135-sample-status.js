module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Statuses',
      [
        {
          id: 1,
          name: 'Enable',
          type: 'common',
          active: true,
          deleted: false,
          createdAt: '2021-05-24 16:52:31.814+05:30',
          updatedAt: '2021-05-24 16:52:31.814+05:30',
        },
        {
          id: 2,
          name: 'Disable',
          type: 'common',
          active: true,
          deleted: false,
          createdAt: '2022-05-24 16:52:31.814+05:30',
          updatedAt: '2022-05-24 16:52:31.814+05:30',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
