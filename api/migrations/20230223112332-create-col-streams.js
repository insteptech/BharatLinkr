module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('colStreams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mainStreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },
      subStreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subStreams',
          key: 'id',
        },
      },
      colStreamName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('colStreams');
  },
};
