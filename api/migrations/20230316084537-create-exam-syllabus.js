'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examSyllabuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      examId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      examSyllabusHighlights: {
        type: Sequelize.STRING(100000)
      },
      examSyllabusPaper1Pattern: {
        type: Sequelize.STRING(100000)
      },
      examSyllabusPaper2Pattern: {
        type: Sequelize.STRING(100000)
      },
      examSyllabusPaper3Pattern: {
        type: Sequelize.STRING(100000)
      },
      examSyllabusPaper4Pattern: {
        type: Sequelize.STRING(100000)
      },
      examSyllabusPaper5Pattern: {
        type: Sequelize.STRING(100000)
      },
      examSyllabusPaper6Pattern: {
        type: Sequelize.STRING(100000)
      },
      bestBooks: {
        type: Sequelize.STRING(100000)
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
    await queryInterface.dropTable('examSyllabuses');
  }
};