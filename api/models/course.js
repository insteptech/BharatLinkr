const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  course.init(
    {
      mainStreamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mainStreams',
          key: 'id',
        },
      },

      courseTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      courseName: {
        type: DataTypes.STRING,
      },
      courseCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      eligibility: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      courseDuration: {
        type: DataTypes.STRING,
      },
      averageFees: {
        type: DataTypes.STRING,
      },
      averageSalary: {
        type: DataTypes.STRING,
      },
      entranceExamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      courseLevelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'masterFilters',
          key: 'id',
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'course',
      paranoid: false,
      timestamps: true,
    }
  );
  return course;
};