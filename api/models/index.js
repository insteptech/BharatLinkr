/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFile = require('../config/config');

const basename = path.basename(__filename);

const config = configFile.development;

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.sequelize = sequelize;

db.User.belongsTo(db.Role, {as:'Roles', foreignKey: 'roleId' });
db.State.belongsTo(db.Countries, { as: "Countries", foreignKey: 'countryId' });

db.City.belongsTo(db.State, { as: "State", foreignKey: 'stateId' });

db.subStream.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' });
db.colStream.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' });
db.colStream.belongsTo(db.subStream, { as: "SubStream", foreignKey: 'subStreamId' });

db.masterFilter.belongsTo(db.Status, { as: "Status", foreignKey: 'statusId' });

db.exam.hasMany(db.examFAQ, { as: "examFAQ", foreignKey: 'examId' });

db.exam.belongsTo(db.masterFilter, { as: "CourseType", foreignKey: 'courseTypeId' });
db.exam.belongsTo(db.masterFilter, { as: "ExamType", foreignKey: 'examTypeId' });
db.exam.belongsTo(db.masterFilter, { as: "ExamMode", foreignKey: 'examModeId' });
db.exam.belongsTo(db.masterFilter, { as: "ApplicationMode", foreignKey: 'applicationModeId' });

db.exam.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' });

db.exam.hasMany(db.examAbout, { as: "ExamAbout", foreignKey: 'examId' });
db.exam.hasMany(db.examAdmitCard, { as: "AdmitCard", foreignKey: 'examId' });
db.exam.hasMany(db.examCentres, { as: "Centres", foreignKey: 'examId' });
db.exam.hasMany(db.examCounselling, { as: "Counselling", foreignKey: 'examId' });
db.exam.hasMany(db.examEligibility, { as: "Eligibility", foreignKey: 'examId' });
db.exam.hasMany(db.examImportantDates, { as: "ImportantDates", foreignKey: 'examId' });
db.exam.hasMany(db.examParticipatingColleges, { as: "ParticipatingCollege", foreignKey: 'examId' });
db.exam.hasMany(db.examPattern, { as: "Pattern", foreignKey: 'examId' });
db.exam.hasMany(db.examPreparationTips, { as: "PreparationTips", foreignKey: 'examId' });
db.exam.hasMany(db.examRegistration, { as: "Registration", foreignKey: 'examId' });
db.exam.hasMany(db.examReservation, { as: "Reservation", foreignKey: 'examId' });
db.exam.hasMany(db.examSyllabus, { as: "Syllabus", foreignKey: 'examId' });
db.exam.hasMany(db.examFAQ, { as: "FAQ", foreignKey: 'examId' });
db.exam.hasMany(db.collegeAssociateCourse, { as: "AssociateCourse", foreignKey: 'chooseExamAcceptedId' });
db.collegeAssociateCourse.belongsTo(db.college, { as: "College", foreignKey: 'collegeId' });


db.course.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' });
db.course.belongsTo(db.masterFilter, { as: "CourseType", foreignKey: 'courseTypeId' });
db.course.belongsTo(db.masterFilter, { as: "CourseCategory", foreignKey: 'courseCategoryId' });
db.course.belongsTo(db.masterFilter, { as: "Eligibility", foreignKey: 'eligibility' });
db.course.belongsTo(db.exam, { as: "EntranceExam", foreignKey: 'entranceExamId' });
db.course.belongsTo(db.masterFilter, { as: "courseLevel", foreignKey: 'courseLevelId' });
db.course.hasMany(db.courseCMS, { as: "CMS", foreignKey: 'courseId' });

db.exam.hasMany(db.course, { as: "courses", foreignKey: 'entranceExamId' });



db.college.belongsTo(db.masterFilter, { as: "Affiliation", foreignKey: 'chooseAffiliationId' })
db.college.belongsTo(db.masterFilter, { as: "CollegeType", foreignKey: 'collegeTypeId' })
db.college.belongsTo(db.masterFilter, { as: "Approval", foreignKey: 'chooseApprovalId' })
db.college.belongsTo(db.State, { as: "States", foreignKey: 'collegeStateId' })
db.college.belongsTo(db.City, { as: "Cities", foreignKey: 'collegeCityId' })
db.college.hasMany(db.collegeAgency, { as: "CollegeAgency", foreignKey: 'collegeId' })
db.collegeAgency.belongsTo(db.masterFilter, { as: "Agency", foreignKey: 'collegeAgencyId' })
db.collegeAgency.belongsTo(db.mainStream, { as: "AgencyFor", foreignKey: 'collegeAgencyFor' })

db.college.belongsTo(db.Status, { as: "Status", foreignKey: 'collegeStatusId' })
db.college.hasMany(db.collegeAssociateCourse, { as: "AssociateCourse", foreignKey: 'collegeId' })

db.collegeAssociateCourse.belongsTo(db.masterFilter, { as: "CourseType", foreignKey: 'courseTypeId' })
db.collegeAssociateCourse.belongsTo(db.masterFilter, { as: "Place", foreignKey: 'coursePlaceId' })
db.collegeAssociateCourse.belongsTo(db.masterFilter, { as: "Eligibility", foreignKey: 'courseEligibility' })
db.collegeAssociateCourse.belongsTo(db.masterFilter, { as: "CourseLevel", foreignKey: 'courseLevel' })
db.collegeAssociateCourse.belongsTo(db.masterFilter, { as: "ProgramType", foreignKey: 'programTypeId' })
db.collegeAssociateCourse.belongsTo(db.masterFilter, { as: "CourseCategory", foreignKey: 'courseCategoryId' })
db.collegeAssociateCourse.belongsTo(db.exam, { as: "ExamAccepted", foreignKey: 'chooseExamAcceptedId' })
db.collegeAssociateCourse.hasMany(db.collegeAssociateStream, { as: "CourseAssociateStream", foreignKey: 'collegeAssociateId' })

db.collegeAssociateStream.belongsTo(db.mainStream, { as: "MainStream", foreignKey: 'mainStreamId' })
db.collegeAssociateStream.belongsTo(db.subStream, { as: "SubStream", foreignKey: 'subStreamId' })
db.collegeAssociateStream.belongsTo(db.colStream, { as: "ColStream", foreignKey: 'colStreamId' })

db.collegeAssociateCourse.hasMany(db.collegeAssociateFees, { as: "CourseFees", foreignKey: 'collegeAssociateId' })
db.collegeAssociateFees.belongsTo(db.masterFilter, { as: "FeeDetails", foreignKey: 'courseFeeDetailsId' })




db.college.hasMany(db.collegeAbout, { as: "CollegeAbout", foreignKey: 'collegeId' })
db.college.hasMany(db.collegeAdmission, { as: "CollegeAdmission", foreignKey: 'collegeId' })
db.college.hasMany(db.collegeDistanceEducation, { as: "DistanceEducation", foreignKey: 'collegeId' })
db.college.hasMany(db.collegeScholarShip, { as: "Scholarship", foreignKey: 'collegeId' })
db.college.hasMany(db.collegePlacements, { as: "Placements", foreignKey: 'collegeId' })
db.college.hasMany(db.collegeFAQ, { as: "FAQ", foreignKey: 'collegeId' })
db.college.hasMany(db.collegeLikesCount, { as: "CountLikesShare", foreignKey: 'collegeId' })
db.college.hasMany(db.collegeLinksData, { as: "Followers", foreignKey: 'collegeId' })
db.college.hasMany(db.collegePosts, { as: "Posts", foreignKey: 'collegeId' })





db.mainStream.hasMany(db.course, { as: "coursess", foreignKey: 'mainStreamId' });

// db.college.hasMany(db.collegeAssociateCourse, { as: "collegeCourse", foreignKey: 'collegeId' })
db.course.belongsTo(db.mainStream, { as: "mainStreamCounts", foreignKey: 'mainStreamId' })
// db.collegeAssociateCourse.hasMany(db.collegeAssociateStream, { as: "MainStreamCollege", foreignKey: 'collegeAssociateId' });
db.collegeAssociateStream.belongsTo(db.collegeAssociateCourse, { as: "MainStreamColleges", foreignKey: 'collegeAssociateId' });
db.collegeAssociateCourse.belongsTo(db.college, { as: "collegeCourses", foreignKey: 'collegeId' })

db.collegeAssociateCourse.belongsTo(db.college, { as: "college", foreignKey: 'collegeId' })

db.corporateSubCategories.belongsTo(db.corporateMainCategories, { as: "MainCategories", foreignKey: 'mainCategoryId' })
db.corporateRegister.belongsTo(db.corporateMainCategories,{as:"MainCategory", foreignKey: "mainCategoryId"})
db.corporateRegister.belongsTo(db.corporateSubCategories,{as:"SubCategory", foreignKey: "subCategoryId"})
db.corporateRegister.hasMany(db.corporateCMS,{as:"CMS", foreignKey: "corporateId"})
db.corporateRegister.hasMany(db.corporateLikesCount,{as:"count", foreignKey: "corporateId"})



db.mockTest.belongsTo(db.corporateMainCategories,{as:"MainCategory", foreignKey: "mainCategoryId"})
db.mockTest.belongsTo(db.corporateSubCategories,{as:"SubCategory", foreignKey: "subCategoryId"})
db.mockTest.hasMany(db.mockTestFAQ,{as:"Questions", foreignKey: "mockTestId"})
// db.mockTest.hasMany(db.mockTestFAQAnswer,{as:"Answerss", foreignKey: "questionId"})
db.mockTestFAQAnswer.belongsTo(db.mockTestFAQ,{as:"Question", foreignKey: "questionId"})
db.mockTest.hasMany(db.mockTestLikes,{as:"Likes&ViewsCount", foreignKey: "mockTestId"})
db.mockTest.hasMany(db.mockTestFAQAnswer,{as:"Answers", foreignKey: "mockTestId"})
db.mockTestFAQ.hasMany(db.mockTestFAQAnswer,{as:"Answerss", foreignKey: "questionId"})


db.industry.belongsTo(db.sector,{as:"Sector", foreignKey: "sectorId"})


db.organisation.belongsTo(db.State,{as:"States", foreignKey: "stateId"})
db.organisation.belongsTo(db.City,{as:"Cities", foreignKey: "cityId"})
db.organisation.hasMany(db.organisationCMS,{as:"OrganisationCMS", foreignKey: "organisationId"})
db.organisation.hasMany(db.organisationSector,{as:"orgSector", foreignKey: "organisationId"})
db.organisationSector.belongsTo(db.sector,{as:"Sector", foreignKey: "sectorId"})

db.organisation.hasMany(db.organisationIndustry,{as:"orgIndustry", foreignKey: "organisationId"})
db.organisationIndustry.belongsTo(db.industry,{as:"Industry", foreignKey: "industryId"})
db.organisation.hasMany(db.organisationNatureOfBusiness,{as:"BusinessNature", foreignKey: "organisationId"})
db.organisation.hasMany(db.organisationCompanyLevel,{as:"CompanyLevel", foreignKey: "organisationId"})

db.collegeLinksData.belongsTo(db.User,{as:"Users", foreignKey: "userId"})
db.organisationLinksData.belongsTo(db.User,{as:"Users", foreignKey: "userId"})
db.organisation.hasMany(db.organisationLikesCount,{as:"LikesCount", foreignKey: "organisationId"})
db.organisation.hasMany(db.organisationLinksData,{as:"Followers", foreignKey: "organisationId"})
db.organisationLinksData.belongsTo(db.organisation,{as:"organisationss", foreignKey: "organisationId"})
db.organisation.hasMany(db.organisationPost,{as:"Posts", foreignKey: "organisationId"})

db.organisation.belongsTo(db.organisationCompany,{as:"OrganisationCompany", foreignKey: "companyId"})
db.organisation.belongsTo(db.organisationBrand,{as:"OrganisationBrand", foreignKey: "brandId"})
db.organisation.belongsTo(db.organisationGroup,{as:"OrganisationGroup", foreignKey: "groupId"})

db.professionCode.belongsTo(db.familyCode,{as:"FamilyCode", foreignKey: "familyId"})

db.professionRegister.belongsTo(db.familyCode,{as:"FamilyCode", foreignKey:"familyId"})
db.professionRegister.belongsTo(db.professionCode,{as:"ProfessionCode", foreignKey:"professionId"})
db.professionRegister.belongsTo(db.course,{as:"Courses", foreignKey:"courseId"})





















db.User.belongsTo(db.State,{as:"States", foreignKey: "stateId"})
db.User.belongsTo(db.City,{as:"Cities", foreignKey: "cityId"})




























// db.mainStream.hasMany(db.course, { as: "StreamCourse", foreignKey: 'mainStreamId' });



































module.exports = db;
