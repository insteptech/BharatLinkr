'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examPatterns', {
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
      examPatternHighlights: {
        type: Sequelize.STRING(100000)
      },
      examPatternPaper1Pattern: {
        type: Sequelize.STRING(100000)
      },
      examPatternPaper2Pattern: {
        type: Sequelize.STRING(100000)
      },
      examPatternPaper3Pattern: {
        type: Sequelize.STRING(100000)
      },
      examPatternPaper4Pattern: {
        type: Sequelize.STRING(100000)
      },
      examPatternPaper5Pattern: {
        type: Sequelize.STRING(100000)
      },
      examPatternPaper6Pattern: {
        type: Sequelize.STRING(100000)
      },
      weightage: {
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
    await queryInterface.dropTable('examPatterns');
  }
};