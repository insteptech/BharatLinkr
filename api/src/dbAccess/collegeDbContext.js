const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const XLSX = require('xlsx');
const excelJS = require('exceljs');
const { Op } = require('sequelize');


const {
  college,

  course,
  State,

  City,
  Status,

  sequelize,

  masterFilter,

  collegeAssociateCourse,

  subStream,
  mainStream,
  colStream,

  collegeAdmission,
  collegeAbout,

  collegeDistanceEducation,

  collegeScholarShip,

  collegePlacements,

  collegeFAQ,
  collegeAgency,

  collegeAssociateStream,
  collegeAssociateFees,

  exam,

  collegeLikesCount,
  collegeLinksData,
  collegePosts,
  listOfUsersLikes,
  User,


} = require('../../models');
const { status } = require('../../config/config');

const writeFiles = async ({ collegeLogoFile, collegeImageFile, imageFile }) => {
  const baseDir = path.join(__dirname, '../../');

  const dir = `${baseDir}/documents/college`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (collegeLogoFile && collegeLogoFile.length > 0) {
    await Promise.all(
      collegeLogoFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }
  if (collegeImageFile && collegeImageFile.length > 0) {
    await Promise.all(
      collegeImageFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded3'));
      })
    );
  }

  if (imageFile && imageFile.length > 0) {
    await Promise.all(
      imageFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded3'));
      })
    );
  }


};

const addCollege = async (req) => {
  try {
    const t = await sequelize.transaction();
    const cllg1 = [];
    const collegeData = JSON.parse(req.body.collegeData);

    const { collegeLogoFile, collegeImageFile, imageFile } = req.files;

    await writeFiles(req.files);

    await Promise.all(
      collegeData.payload.map(async (item) => {
        let cllg;
        await Promise.all(
          item.college.map(async (cllg2) => {
            cllg = await college.findOne({
              where: {
                name: Sequelize.where(
                  Sequelize.fn('LOWER', Sequelize.col('collegeName')),
                  Sequelize.fn('lower', cllg2.collegeName)
                ),
                deleted: false,
              },


            });
          })
        )
        if (!cllg) {
          let result;

          if (item.college && item.college.length > 0) {
            await Promise.all(item.college.map(async (cllg2) => {
              if (collegeLogoFile && collegeLogoFile.length > 0) {
                const fileExist = collegeLogoFile.find((image1) => image1.originalname);
                if (fileExist) {
                  cllg2.image1 = fileExist.originalname;
                }
                if (collegeLogoFile) cllg2['collegeLogo'] = cllg2.image1;
              }

              if (collegeImageFile && collegeImageFile.length > 0) {
                const fileExist = collegeImageFile.find((image2) => image2.originalname);
                if (fileExist) {
                  cllg2.image2 = fileExist.originalname;
                }
                if (collegeImageFile) cllg2['collegeImage'] = cllg2.image2;
              }
              result = await college.create(cllg2, { returning: true }, { transaction: t });
              return result
            })
            )
          }
          if (item.collegeAgencies && item.collegeAgencies.length > 0) {
            await Promise.all(item.collegeAgencies.map(async (cllgagency) => {
              cllgagency['collegeId'] = result.id;
              await collegeAgency.create(cllgagency, { returning: true }, { transaction: t });
            }))
          }

          let courses;
          if (item.collegeCourse && item.collegeCourse.length > 0) {
            await Promise.all(item.collegeCourse.map(async (cllgCourse) => {
              cllgCourse['collegeId'] = result.id;
              courses = await collegeAssociateCourse.create(cllgCourse, { returning: true }, { transaction: t });
        

              if (cllgCourse.collegeStreams && cllgCourse.collegeStreams.length > 0) {
                await Promise.all(cllgCourse.collegeStreams.map(async (cllgStream) => {
                  cllgStream['collegeAssociateId'] = courses.id;
                  await collegeAssociateStream.create(cllgStream, { returning: true }, { transaction: t });
                }))
              }

              if (cllgCourse.courseFees && cllgCourse.courseFees.length > 0) {
                await Promise.all(cllgCourse.courseFees.map(async (cllgFees) => {
                  cllgFees['collegeAssociateId'] = courses.id;
                  await collegeAssociateFees.create(cllgFees, { returning: true }, { transaction: t });
                }))
              }
            }))
          }
    
          if (item.collegeAbouts && item.collegeAbouts.length > 0) {
            await Promise.all(item.collegeAbouts.map(async (cllgAbout) => {
              cllgAbout['collegeId'] = result.id;
              await collegeAbout.create(cllgAbout, { returning: true }, { transaction: t });
            }))
          }
          if (item.collegeAdmissions && item.collegeAdmissions.length > 0) {
            await Promise.all(item.collegeAdmissions.map(async (cllgAddmision) => {
              cllgAddmision['collegeId'] = result.id;
              await collegeAdmission.create(cllgAddmision, { returning: true }, { transaction: t });
            }))
          }
          if (item.distanceEducation && item.distanceEducation.length > 0) {
            await Promise.all(item.distanceEducation.map(async (distance) => {
              distance['collegeId'] = result.id;
              await collegeDistanceEducation.create(distance, { returning: true }, { transaction: t });
            }))
          }
          if (item.scholarShip && item.scholarShip.length > 0) {
            await Promise.all(item.scholarShip.map(async (scholar) => {
              scholar['collegeId'] = result.id;
              await collegeScholarShip.create(scholar, { returning: true }, { transaction: t });
            }))
          }
          if (item.placements && item.placements.length > 0) {
            await Promise.all(item.placements.map(async (place) => {
              place['collegeId'] = result.id;
              await collegePlacements.create(place, { returning: true }, { transaction: t });
            }))
          }
          if (item.faq && item.faq.length > 0) {
            await Promise.all(item.faq.map(async (cllgfaq) => {

              if (imageFile && imageFile.length > 0) {
                const fileExist = imageFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == cllgfaq.uniqueId
                );
                if (fileExist) {
                  cllgfaq.image = fileExist.originalname;
                }
                if (imageFile) cllgfaq['image'] = cllgfaq.image;

              }
              cllgfaq['collegeId'] = result.id;
              await collegeFAQ.create(cllgfaq, { returning: true }, { transaction: t });
            }))
          }
          cllg1.push(result);
          return result;
        }
        cllg1.push({ collegeName: cllg1.collegeName, status: 'duplicate' });
      })
    );
    await t.commit();
    return { data: cllg1, success: true };
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
};

const collegeList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        collegeName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('collegeName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = req.body.id
    }

    const result = await college.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: collegeLikesCount,
          required: false,
          as: 'CountLikesShare',
        },
        {
          model: collegeLinksData,
          required: false,
          where: { approval: true },
          as: 'Followers',
        },
        {
          model: collegePosts,
          required: false,
          as: 'Posts',
        },

        {
          model: masterFilter,
          required: false,
          as: 'Affiliation',
        },
        {
          model: masterFilter,
          required: false,
          as: 'CollegeType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'Approval',
        },
        {
          model: State,
          required: false,
          as: 'States',
        },
        {
          model: City,
          required: false,
          as: 'Cities',
        },

        {
          model: Status,
          required: false,
          as: 'Status',
        },
        {
          model: collegeAgency,
          required: false,
          where: { deleted: false },
          as: 'CollegeAgency',
          include: [
            {
              model: masterFilter,
              required: false,
              as: 'Agency',
            },
            {
              model: mainStream,
              required: false,
              as: 'AgencyFor',
            },

          ]
        },

        {
          model: collegeAssociateCourse,
          required: false,
          where: { deleted: false },
          as: 'AssociateCourse',
          include: [
            {

              model: masterFilter,
              required: false,
              as: 'CourseType',

            },
            {

              model: masterFilter,
              required: false,
              as: 'Place',

            },
            {

              model: masterFilter,
              required: false,
              as: 'Eligibility',

            },
            {

              model: masterFilter,
              required: false,
              as: 'CourseLevel',

            },
            {

              model: masterFilter,
              required: false,
              as: 'ProgramType',

            },
            {

              model: masterFilter,
              required: false,
              as: 'CourseCategory',

            },
            {

              model: exam,
              required: false,
              as: 'ExamAccepted',

            },
            {
              model: collegeAssociateStream,
              required: false,
              where: { deleted: false },
              as: 'CourseAssociateStream',
              include: [
                {
                  model: mainStream,
                  required: false,
                  as: 'MainStream',
                },
                {
                  model: subStream,
                  required: false,
                  as: 'SubStream',
                },
                {
                  model: colStream,
                  required: false,
                  as: 'ColStream',
                },
          
              ]
            },
            {
              model: collegeAssociateFees,
              required: false,
              where: { deleted: false },
              as: 'CourseFees',
              include:[
                {
                  model: masterFilter,
                  required: false,
                  where: { deleted: false },
                  as: 'FeeDetails',
                }
              ]
            }
          ]

        },
        {
          model: collegeAbout,
          required: false,
          as: 'CollegeAbout',
        },
        {
          model: collegeAdmission,
          required: false,
          as: 'CollegeAdmission',
        }, {
          model: collegeDistanceEducation,
          required: false,
          as: 'DistanceEducation',
        },
        {
          model: collegeScholarShip,
          required: false,
          as: 'Scholarship',
        },
        {
          model: collegePlacements,
          required: false,
          as: 'Placements',
        },
        {
          model: collegeFAQ,
          required: false,
          where: { deleted: false },
          as: 'FAQ',
        },

      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });

    result["rows"] = result["rows"].map((row) => {
      row = row.toJSON();
      row["FollowerCount"] = row["Followers"].length;
      row["PostCount"] = row["Posts"].length;

      return row;
    });



    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const collegeDelete = async (req) => {
  try {
    const collg = await college.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true });
    await collegeAssociateCourse.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });
    await collegeAbout.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });
    await collegeAgency.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });

    await collegeAdmission.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });
    await collegeDistanceEducation.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });
    await collegePlacements.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });
    await collegeScholarShip.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });
    await collegeFAQ.update({ deleted: true }, {
      where: { collegeId: collg.id },
    });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const collegeAssociateCourseDelete = async (req) => {
  try {

    let ascourse = await collegeAssociateCourse.findOne({
      where: { id: req.body.id, collegeId: req.body.collegeId },
    });
    await ascourse.update({ deleted: true }, { where: { id: ascourse.id } });
    await collegeAssociateStream.update({ deleted: true }, { where: { collegeAssociateId: ascourse.id } });



    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const collegeAgencyDelete = async (req) => {
  try {

    let agency = await collegeAgency.findOne({
      where: { id: req.body.id, collegeId: req.body.collegeId },
    });
    await agency.update({ deleted: true }, { where: { id: agency.id } });


    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const collegeStreamsDelete = async (req) => {
  try {

    let agency = await collegeAssociateStream.findOne({
      where: { id: req.body.id },
    });
    await agency.update({ deleted: true }, { where: { id: agency.id } });


    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const collegeFAQDelete = async (req) => {
  try {

    let faq = await collegeFAQ.findOne({
      where: { id: req.body.id, collegeId: req.body.collegeId },
    });
    await faq.update({ deleted: true }, { where: { id: faq.id } });


    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const updateCollege = async (req) => {
  try {
    const result = [];

    const collegeData = JSON.parse(req.body.collegeData);
    const { collegeLogoFile, collegeImageFile, imageFile } = req.files;


    const cllg = await college.findOne({
      where: {
        collegeName: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('collegeName')),
          Sequelize.fn('lower', collegeData.collegeName)
        ),
        deleted: false,
      },

    });

    await writeFiles(req.files);

    if (collegeLogoFile && collegeLogoFile.length > 0) {
      const fileExist = collegeLogoFile.find(
        (file) => file.originalname
      );
      if (fileExist) {
        console.log
        if (cllg && cllg.collegeLogo)
          if (fs.existsSync(path.resolve(dir, `${cllg.collegeLogo}`))) {
            fs.unlinkSync(path.resolve(dir, `${cllg.collegeLogo}`));
          }

        collegeData['collegeLogo'] = fileExist.originalname;
      }
    }

    if (collegeImageFile && collegeImageFile.length > 0) {
      const fileExist = collegeImageFile.find(
        (file) => file.originalname
      );
      if (fileExist) {
        if (cllg && cllg.collegeImage)
          if (fs.existsSync(path.resolve(dir, `${cllg.collegeImage}`))) {
            fs.unlinkSync(path.resolve(dir, `${cllg.collegeImage}`));
          }

        collegeData['collegeImage'] = fileExist.originalname;
      }
    }
    if (cllg && cllg.collegeName === collegeData.collegeName) {
      console.log('duplicate')
      result.push({ collegeName: collegeData.collegeName, status: 'duplicate' });

    } else {
      const updateData = await college.update(collegeData, { where: { id: collegeData.id }, returning: true })

      if (collegeData.collegeCourse) {
       await Promise.all(
        collegeData.collegeCourse.map(async(courseItem)=>{
          if(courseItem.id){
            await collegeAssociateCourse.update(courseItem,{where:{id:courseItem.id}})
          }else{
            collegeData.collegeCourse['collegeId'] = collegeData.id;
            await collegeAssociateCourse.create(courseItem)
          }

          if (courseItem.collegeStreams) {
            courseItem.collegeStreams.map(async(cllgStreams)=>{
              if(cllgStreams.id){
          await collegeAssociateStream.update(cllgStreams, { where: { id: cllgStreams.id }, returning: true })
              }else{
                cllgStreams['collegeAssociateId'] = courseItem.id;
                    await collegeAssociateStream.create(cllgStreams)
              }
            })
          };

          if (courseItem.collegeFees) {
            courseItem.collegeFees.map(async(cllgFees)=>{
              if(cllgFees.id){
          await collegeAssociateFees.update(cllgFees, { where: { id: cllgFees.id }, returning: true })
              }else{
                cllgFees['collegeAssociateId'] = courseItem.id;
                    await collegeAssociateFees.create(cllgFees)
              }
            })
          };

        })
       )
      };
 
     

  if(collegeData.collegeAgencies){
    await Promise.all(
      collegeData.collegeAgencies.map(async (agencyItem) => {
        if (agencyItem.id) {
          await collegeAgency.update(agencyItem, { where: { id: agencyItem.id }, returning: true })
        } else {

          agencyItem['collegeId'] = collegeData.id;
          await collegeAgency.create(agencyItem)
        }
      })
    )

  }
    
    

      if (collegeData.collegeAbouts) {
        if (collegeData.collegeAbouts.id) {
          await collegeAbout.update(collegeData.collegeAbouts, { where: { id: collegeData.collegeAbouts.id }, returning: true })
        } else {
          collegeData.collegeAbouts['collegeId'] = collegeData.id;
          await collegeAbout.create(collegeData.collegeAbouts)
        }
      };

      if (collegeData.collegeAdmissions) {
        if (collegeData.collegeAdmissions.id) {
          await collegeAdmission.update(collegeData.collegeAdmissions, { where: { id: collegeData.collegeAdmissions.id }, returning: true })

        } else {
          collegeData.collegeAdmissions['collegeId'] = collegeData.id;
          await collegeAdmission.create(collegeData.collegeAdmissions)
        }
      };

      if (collegeData.distanceEducation) {
        if (collegeData.distanceEducation.id) {
          await collegeDistanceEducation.update(collegeData.distanceEducation, { where: { id: collegeData.distanceEducation.id }, returning: true })
        } else {
          collegeData.distanceEducation['collegeId'] = collegeData.id;
          await collegeDistanceEducation.create(collegeData.distanceEducation)
        }
      }

      if (collegeData.scholarShip) {
        if (collegeData.scholarShip.id) {
          await collegeScholarShip.update(collegeData.scholarShip, { where: { id: collegeData.scholarShip.id }, returning: true })
        } else {
          collegeData.scholarShip['collegeId'] = collegeData.id;
          await collegeScholarShip.create(collegeData.scholarShip)
        }
      }

      if (collegeData.placements) {
        if (collegeData.placements.id) {
          await collegePlacements.update(collegeData.placements, { where: { id: collegeData.placements.id }, returning: true })
        } else {
          collegeData.placements['collegeId'] = collegeData.id;
          await collegePlacements.create(collegeData.placements)
        }
      }

if(collegeData.faq){

  await Promise.all(
    collegeData.faq.map(async (faqItem) => {
      let faqCollege;
      if (cllg && cllg.collegeFAQ) {
        await Promise.all(

          cllg.collegeFAQ.map(async (item3) => {
            faqCollege = await collegeFAQ.findOne({ where: { id: item3.id } })

          })
        )
      }
      await writeFiles(req.files);

      if (imageFile && imageFile.length > 0) {

        const fileExist = imageFile.find(
          (image) => image.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == faqItem.uniqueId
        );

        if (fileExist) {

          if (faqCollege && faqCollege.image)

            if (fs.existsSync(path.resolve(dir, `${faqCollege.image}`)))
              fs.unlinkSync(path.resolve(dir, `${faqCollege.image}`));

          faqItem.image = fileExist.originalname;
        }

        if (imageFile) faqItem['image'] = faqItem.image;
      }
      if (faqItem.id) {
        await collegeFAQ.update(faqItem, { where: { id: faqItem.id }, returning: true })
      } else {

        faqItem['collegeId'] = collegeData.id;
        await collegeFAQ.create(faqItem)
      }
    })
  )


}


     


      result.push(updateData)
    }

    return { data: result, success: true };
  } catch (error) {
    console.log(error, 'ioioioiio')
    return { data: null, message: error.message, success: false };
  }
};

// this api for college courses
const collegeCourseList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.id) {
      whrCondition = req.body.id
    }
    if (req.body.search) {
      const obj = {
        courseName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('courseName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    console.log(whrCondition, "whrCondition")

    const result = await collegeAssociateCourse.findAndCountAll({
      where: whrCondition,
      attributes: ['id', 'courseName'],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

//this api for filter data from college 
const allCollegeList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;

    let whrCondition = { deleted: false };
    let wherecond = { deleted: false };
    let result;

    if (req.body.search || req.body.id || req.body.mainStreamId || req.body.courseId || req.body.collegeStateId ||
      req.body.collegeCityId || req.body.programTypeId || req.body.collegeTypeId || req.body.chooseExamAcceptedId || req.body.courseFee || req.body.chooseAffiliationId || req.body.courseDuration || req.body.collegeAgencyId
    ) {
      if (req.body.search) {
        const obj = {
          [Op.or]: [{ collegeName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('collegeName')), 'LIKE', `%${req.body.search.toLowerCase()}%`) }, { courseName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('AssociateCourse.courseName')), 'LIKE', `%${req.body.search.toLowerCase()}%`) }, { mainStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('AssociateCourse.CourseAssociateStream.MainStream.mainStreamName')), 'LIKE', `%${req.body.search.toLowerCase()}%`) }]
        };
        whrCondition = { ...obj, ...whrCondition };
      }

      if (req.body.id) {
        whrCondition = {id:req.body.id}
      }
      if (req.body.mainStreamId) {
        wherecond = { ['$AssociateCourse.CourseAssociateStream.mainStreamId$']: req.body.mainStreamId }
      }
      if (req.body.courseId) {
        wherecond = { ['$AssociateCourse.courseName$']: req.body.courseId }
      }

      let state;
      if (req.body.collegeStateId) {
        state = {
          collegeStateId: req.body.collegeStateId,
        };
      }

      let city;
      if (req.body.collegeCityId) {
        city = {
          collegeCityId: req.body.collegeCityId,
        };
      }

      if (req.body.programTypeId) {
        wherecond = { ['$AssociateCourse.programTypeId$']: req.body.programTypeId }

      }


      let collegeType;
      if (req.body.collegeTypeId) {
        collegeType = {
          collegeTypeId: req.body.collegeTypeId,
        };
      }

      if (req.body.chooseExamAcceptedId) {
        wherecond = { ['$AssociateCourse.chooseExamAcceptedId$']: req.body.chooseExamAcceptedId }

      }

      if (req.body.courseFee && req.body.courseFee.length == 2) {
        wherecond = { ['$AssociateCourse.CourseAssociateStream.courseFee$']: { [Op.between]: [req.body.courseFee[0], req.body.courseFee[1]] } }
      }

      if (req.body.courseTypeId) {
        wherecond = { ['$AssociateCourse.courseTypeId$']: req.body.courseTypeId }

      }

      let Affiliations;
      if (req.body.chooseAffiliationId) {
        state = {
          chooseAffiliationId: req.body.chooseAffiliationId,
        };
      }

      if (req.body.courseDuration) {
        wherecond = { ['$AssociateCourse.courseDuration$']: req.body.courseDuration }

      }

      if (req.body.collegeAgencyId) {
        wherecond = { ['$CollegeAgency.collegeAgencyId$']: req.body.collegeAgencyId }

      }

      result = await college.findAndCountAll({
        where: { [Op.and]: [whrCondition, wherecond, state, city, collegeType, Affiliations] },
        subQuery: false,
        include: [

          {
            model: collegeLikesCount,
            required: false,
            as: 'CountLikesShare',
          },
          {
            model: collegeLinksData,
            required: false,
            where: { approval: true },
            as: 'Followers',
          },
          {
            model: collegePosts,
            required: false,
            as: 'Posts',
          },

          {
            model: collegeAssociateCourse,
            required: false,
            where: { deleted: false },
            as: 'AssociateCourse',
            include: [
              {
  
                model: masterFilter,
                required: false,
                as: 'CourseType',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'Place',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'Eligibility',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'CourseLevel',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'ProgramType',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'CourseCategory',
  
              },
              {
  
                model: exam,
                required: false,
                as: 'ExamAccepted',
  
              },
              {
                model: collegeAssociateStream,
                required: false,
                where: { deleted: false },
                as: 'CourseAssociateStream',
                include: [
                  {
                    model: mainStream,
                    required: false,
                    as: 'MainStream',
                  },
                  {
                    model: subStream,
                    required: false,
                    as: 'SubStream',
                  },
                  {
                    model: colStream,
                    required: false,
                    as: 'ColStream',
                  },
            
                ]
              },
              {
                model: collegeAssociateFees,
                required: false,
                where: { deleted: false },
                as: 'CourseFees',
                include:[
                  {
                    model: masterFilter,
                    required: false,
                    where: { deleted: false },
                    as: 'FeeDetails',
                  }
                ]
              }
            ]
  
          },
          {
            model: masterFilter,
            required: false,
            as: 'Affiliation',
          },
          {
            model: masterFilter,
            required: false,
            as: 'CollegeType',
          },
          {
            model: masterFilter,
            required: false,
            as: 'Approval',
          },
          {
            model: State,
            required: false,
            as: 'States',
          },
          {
            model: City,
            required: false,
            as: 'Cities',
          },

          {
            model: Status,
            required: false,
            as: 'Status',
          },
          {
            model: collegeAgency,
            required: false,
            where: { deleted: false },
            as: 'CollegeAgency',
            include: [
              {
                model: masterFilter,
                required: false,
                as: 'Agency',
              },
              {
                model: mainStream,
                required: false,
                as: 'AgencyFor',
              },

            ]
          },

          {
            model: collegeAbout,
            required: false,
            as: 'CollegeAbout',
          },
          {
            model: collegeAdmission,
            required: false,
            as: 'CollegeAdmission',
          },
          {
            model: collegeDistanceEducation,
            required: false,
            as: 'DistanceEducation',
          },
          {
            model: collegeScholarShip,
            required: false,
            as: 'Scholarship',
          },
          {
            model: collegePlacements,
            required: false,
            as: 'Placements',
          },
          {
            model: collegeFAQ,
            required: false,
            where: { deleted: false },
            as: 'FAQ',
          },


        ],
        offset: (pageNo - 1) * size,
        limit: size,
        distinct: true,
        order: [['id', 'ASC']],
      });
    }
    ////////////////else part ///////////////////
    else {
      result = await college.findAndCountAll({
          where:wherecond,
        include: [
          {
            model: collegeLikesCount,
            required: false,
            as: 'CountLikesShare',
          },
          {
            model: collegeLinksData,
            required: false,
            where: { approval: true },
            as: 'Followers',
          },
          {
            model: collegePosts,
            required: false,
            as: 'Posts',
          },

          {
            model: collegeAssociateCourse,
            required: false,
            where: { deleted: false },
            as: 'AssociateCourse',
            include: [
              {
  
                model: masterFilter,
                required: false,
                as: 'CourseType',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'Place',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'Eligibility',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'CourseLevel',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'ProgramType',
  
              },
              {
  
                model: masterFilter,
                required: false,
                as: 'CourseCategory',
  
              },
              {
  
                model: exam,
                required: false,
                as: 'ExamAccepted',
  
              },
              {
                model: collegeAssociateStream,
                required: false,
                where: { deleted: false },
                as: 'CourseAssociateStream',
                include: [
                  {
                    model: mainStream,
                    required: false,
                    as: 'MainStream',
                  },
                  {
                    model: subStream,
                    required: false,
                    as: 'SubStream',
                  },
                  {
                    model: colStream,
                    required: false,
                    as: 'ColStream',
                  },
            
                ]
              },
              {
                model: collegeAssociateFees,
                required: false,
                where: { deleted: false },
                as: 'CourseFees',
                include:[
                  {
                    model: masterFilter,
                    required: false,
                    where: { deleted: false },
                    as: 'FeeDetails',
                  }
                ]
              }
            ]
  
          },
          {
            model: masterFilter,
            required: false,
            as: 'Affiliation',
          },
          {
            model: masterFilter,
            required: false,
            as: 'CollegeType',
          },
          {
            model: masterFilter,
            required: false,
            as: 'Approval',
          },
          {
            model: State,
            required: false,
            as: 'States',
          },
          {
            model: City,
            required: false,
            as: 'Cities',
          },

          {
            model: Status,
            required: false,
            as: 'Status',
          },
          {
            model: collegeAgency,
            required: false,
            where: { deleted: false },
            as: 'CollegeAgency',
            include: [
              {
                model: masterFilter,
                required: false,
                as: 'Agency',
              },
              {
                model: mainStream,
                required: false,
                as: 'AgencyFor',
              },

            ]
          },

          {
            model: collegeAbout,
            required: false,
            as: 'CollegeAbout',
          },
          {
            model: collegeAdmission,
            required: false,
            as: 'CollegeAdmission',
          },
          {
            model: collegeDistanceEducation,
            required: false,
            as: 'DistanceEducation',
          },
          {
            model: collegeScholarShip,
            required: false,
            as: 'Scholarship',
          },
          {
            model: collegePlacements,
            required: false,
            as: 'Placements',
          },
          {
            model: collegeFAQ,
            required: false,
            where: { deleted: false },
            as: 'FAQ',
          },


        ],
        offset: (pageNo - 1) * size,
        limit: size,
        distinct: true,
        order: [['id', 'ASC']],
      });
    }

    result["rows"] = result["rows"].map((row) => {
      row = row.toJSON();
      row["FollowerCount"] = row["Followers"].length;
      row["PostCount"] = row["Posts"].length;

      return row;
    });




    return { data: result, success: true };
  } catch (error) {
    console.log(error, '787878787878787')
    throw new Error(error);
  }
};


const statusList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = req.body.id
    }

    const result = await Status.findAndCountAll({
      where: whrCondition,


      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const collegeAddLikesAndViews = async (req) => {
  try {
    let result;
    const likesCount = await collegeLikesCount.findOne({
      where: { collegeId: req.body.collegeId }
    })

    if (likesCount) {

      let obj = {
        collegeId: likesCount.collegeId,
        userId: req.body.userId
      }
      if (req.body.update == "likes") {
        obj["likes"] = likesCount.likes + 1;
      }
      if (req.body.update == "share") {
        obj["share"] = likesCount.share + 1;
      }

      if (req.body.update == "dislikes") {
        obj["likes"] = likesCount.likes - 1;
      }
      result = await collegeLikesCount.update(obj, { where: { id: likesCount.id } });
      const likeUser = await listOfUsersLikes.findOne({
        where: { userId: req.body.userId, categoryId: req.body.collegeId, categoryTypes: 'college' }
      })
      if (likeUser && !req.body.update == "share" || req.body.update == "dislikes") {
        await listOfUsersLikes.destroy({ where: { categoryTypes: 'college', userId: req.body.userId, categoryId: req.body.collegeId, } })
      } else {
        let userObj = {
          userId: req.body.userId,
          categoryId: obj.collegeId,
          categoryTypes: 'college'
        };
        if (req.body.update == "likes") {

          await listOfUsersLikes.create(userObj)
        }
      }
    } else {
      let obj = {
        collegeId: req.body.collegeId,
        likes: 0,
        share: 0
      }
      let userObj = {
        userId: req.body.userId,
        categoryId: obj.collegeId,
        categoryTypes: 'college'
      };

      if (req.body.update == "likes") {
        obj["likes"] = 1;
      }
      if (req.body.update == "share") {
        obj["share"] = 1;
      }

      result = await collegeLikesCount.create(obj);
      await listOfUsersLikes.create(userObj)

    }


    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const addCollegeLinksData = async (req) => {
  try {
    const link = [];
    await Promise.all(
      req.body.linkData.map(async (item) => {
        let obj = { collegeId: item.collegeId, userId: item.userId, deleted: false }

        const prg = await collegeLinksData.findOne({
          where:
            { [Op.and]: [obj] }
        });
        if (!prg) {
          const result = await collegeLinksData.create({ ...item, returning: true });
          link.push(result);
          return result;
        }
        link.push({ userId: item.userId, status: 'already added' });
      })
    );
    return { data: link, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

// this api call on approval of links 
const collegeLinkApproval = async (req) => {
  try {
    let obj = {
      collegeId: req.body.collegeId,
      userId: req.body.userId
    }
    const link = await collegeLinksData.findOne({
      where:
        { [Op.and]: [obj] }
    });
    if (link) {

      let obj2 = {
        approval: link.approval,
      }
      if (req.body.update == "approved") {
        obj2["approval"] = link.approval = true;
      }

      if (req.body.update == "reject") {
        await collegeLinksData.destroy({
          where: {
            collegeId: req.body.collegeId,
            userId: req.body.userId
          }
        });

      }
      await collegeLinksData.update(obj2, { where: { [Op.and]: [obj] } });


    }
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const addCollegePosts = async (req) => {
  try {
    const postData = JSON.parse(req.body.postData);

    const { imageFile } = req.files;

    await writeFiles({ imageFile });
    let result;

    await Promise.all(
      postData.payload.map(async (item) => {
        if (imageFile && imageFile.length > 0) {
          console.log(imageFile, '09090')
          const fileExist = imageFile.find((image1) => image1.originalname);
          if (fileExist) {
            item.image = fileExist.originalname;
          }
        }

        result = await collegePosts.create(item, { returning: true });
        return result;

      })
    );
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateCollegePost = async (req) => {
  try {


    const postData = JSON.parse(req.body.postData);
    const { imageFile } = req.files;
    await writeFiles(req.files);

    if (imageFile && imageFile.length > 0) {
      const fileExist = imageFile.find(
        (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == postData.uniqueId
      );
      if (fileExist) {
        if (imageFile && imageFile.image)
          if (fs.existsSync(path.resolve(dir, `${imageFile.image}`))) {
            fs.unlinkSync(path.resolve(dir, `${imageFile.image}`));
          }

        postData.image = fileExist.originalname;
      }
    }

    const updateData = await collegePosts.update(postData, { where: { id: postData.id }, returning: true });



    return { data: updateData, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const collegePostList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        posts: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('posts')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false }
    }

    const result = await collegePosts.findAndCountAll({
      where: whrCondition,


      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const collegePostDelete = async (req) => {
  try {
    const collg = await collegePosts.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

///this api for pending request of user to approve 
const collegePendingRequestList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false, approval: false };

    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false, approval: false }
    }


    if (req.body.collegeId) {
      whrCondition = { collegeId: req.body.collegeId, deleted: false, approval: false }
    }

    const result = await collegeLinksData.findAndCountAll({
      where: whrCondition,
      include: [

        {
          model: User,
          required: false,
          as: 'Users',

        }

      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const collegeCourseFeesDelete = async (req) => {
  try {

    let faq = await collegeAssociateFees.findOne({
      where: { id: req.id, },
    });
    await faq.update({ deleted: true }, { where: { id: req.id } });


    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

//////////// Excel Sheet functionality //////////////////////////



const getCollegeSampleDataExcel = async (req, res) => {
  try {

  
    const collegeStates = await State.findAll({
      where: { deleted: false },
    });
    const collegeCities = await City.findAll({
      where: { deleted: false },
    });
    const chooseAffilation = await masterFilter.findAll({
      where: { deleted: false, types: 'affilation' },
    });

    const collegeTypeData = await masterFilter.findAll({
      where: { deleted: false, types: 'collegetype' },
    });

    const chooseApprovalData = await masterFilter.findAll({
      where: { deleted: false, types: 'approvals' },
    });

   

    const statusesData = await Status.findAll({
      where: { deleted: false },
    });


    
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('CollegeData');
    workSheet.columns = [
      { header: 'College Name', key: 'collegeName', width: 20 },
      { header: 'Affiliations', key: 'chooseAffiliationId', width: 20 },
      { header: 'College Type', key: 'collegeTypeId', width: 20 },
      { header: 'Approvals', key: 'chooseApprovalId', width: 20 },
      { header: 'States', key: 'collegeStateId', width: 40 },
      { header: 'City', key: 'collegeCityId', width: 20 },
      { header: 'Email', key: 'collegeMailId', width: 20 },
      { header: 'EstablishmentDate', key: 'collegeEstablishedDate', width: 20 },
      { header: 'NAAC Grade', key: 'collegeNaacGrade', width: 20 },
      { header: 'Status', key: 'collegeStatusId', width: 20 },
    ];
//-------------------------------------------------------------------//
    chooseAffilation.forEach((affilationData) => {
      affilationData.masterFilter = affilationData.name;
    });

    const affilationNames = await Promise.all(
      chooseAffilation.map((affilationData) => {
        return affilationData.name;
      })
    );

    workSheet.getCell('B2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${affilationNames.join(',')}"`],
    };
//------------------------------------------------------------------//
    collegeTypeData.forEach((collegeType) => {
      collegeType.masterFilter = collegeType.name;
    });

    const collegeTypeNames = await Promise.all(
      collegeTypeData.map((collegeType) => {
        return collegeType.name;
      })
    );

    workSheet.getCell('C2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${collegeTypeNames.join(',')}"`],
    };
//-----------------------------------------------------------------//


    chooseApprovalData.forEach((approvals) => {
      approvals.masterFilter = approvals.name;
    });

    const approvalsNames = await Promise.all(
      chooseApprovalData.map((approvals) => {
        return approvals.name;
      })
    );

    workSheet.getCell('D2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${approvalsNames.join(',')}"`],
    };
//-------------------------------------------------------//


collegeStates.forEach((states) => {
  states.State = states.state;
});

const statesName = await Promise.all(
  collegeStates.map((states) => {
    return states.state;
  })
);

workSheet.getCell('E2').dataValidation = {
  type: 'list',
  allowBlank: true,
  formulae: [`"${statesName.join(',')}"`],
};
//-------------------------------------------------------//

collegeCities.forEach((cities) => {
  cities.City = cities.name;
});

const cityNames = await Promise.all(
  collegeCities.map((cities) => {
    return cities.name;
  })
);


workSheet.getCell('F2').dataValidation = {
  type: 'list',
  allowBlank: true,
  formulae: [`"${cityNames.join(',')}"`],
};

//-------------------------------------------------------//


statusesData.forEach((statuses) => {
  statuses.Status = statuses.name;
});

const statusName = await Promise.all(
  statusesData.map((statuses) => {
    return statuses.name;
  })
);
workSheet.getCell('J2').dataValidation = {
  type: 'list',
  allowBlank: true,
  formulae: [`"${statusName.join(',')}"`],
};


    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `College${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    await workbook.xlsx.writeFile('Collegesampledata.xlsx');
    res.send('done');
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};













module.exports = {
  addCollege,
  collegeList,
  collegeDelete,
  updateCollege,
  allCollegeList,
  collegeCourseList,
  statusList,
  addCollegePosts,
  collegeAddLikesAndViews,
  addCollegeLinksData,
  collegeLinkApproval,
  updateCollegePost,
  collegePostList,
  collegePostDelete,
  collegePendingRequestList,
  collegeAssociateCourseDelete,
  collegeAgencyDelete,
  collegeStreamsDelete,
  collegeFAQDelete,
  collegeCourseFeesDelete,
  getCollegeSampleDataExcel

};
