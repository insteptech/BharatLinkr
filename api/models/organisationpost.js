'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisationPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  organisationPost.init({
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'organisation',
        key: 'id',
      },
    },
    postTypes: {
      type: DataTypes.ENUM(
            'script',
            'announcement',
            'jobs',
            'internship',
            'mentoring',
            'questionservices',
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
      type: DataTypes.STRING(10485760)
    },
    description: {
      type: DataTypes.STRING(10485760)
    },
    image: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mainStream',
        key: 'id',
      },
    },
    subDepartment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subStream',
        key: 'id',
      },
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'State',
        key: 'id',
      },
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'City',
        key: 'id',
      },
    },
    workMode: {
      type: DataTypes.STRING
    },
    jobType: {
      type: DataTypes.STRING
    },

    jobRole: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'masterFilter',
        key: 'id',
      },
    },
    eligibility: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'masterFilter',
        key: 'id',
      },
    },
    college: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'college',
        key: 'id',
      },
    },
    course: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'course',
        key: 'id',
      },
    },
    exam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'exam',
        key: 'id',
      },
    },
    corporate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'corporateRegister',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Status',
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
  }, {
    sequelize,
    modelName: 'organisationPost',
    paranoid: false,
    timestamps: true,
  });
  return organisationPost;
};