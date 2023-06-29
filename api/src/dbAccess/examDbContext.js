const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const XLSX = require('xlsx');
const excelJS = require('exceljs');
const { Op } = require('sequelize');

const { exam, course, examAbout, examAdmitCard, examCentres, examRegistration, examImportantDates, examReservation,
  examEligibility, examPattern, examSyllabus, examPreparationTips, examCounselling, examParticipatingColleges,
  examFAQ, sequelize, masterFilter, mainStream, college, collegeAssociateCourse } = require('../../models');

const writeFiles = async ({ examLogoFile, imageFile }) => {
  const baseDir = path.join(__dirname, '../../');

  const dir = `${baseDir}/documents/exam`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (examLogoFile && examLogoFile.length > 0) {
    await Promise.all(
      examLogoFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
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

const addExam = async (req) => {
  try {
    const t = await sequelize.transaction();
    const exam1 = [];
    const examData = JSON.parse(req.body.examData);

    const { examLogoFile, imageFile } = req.files;

    await writeFiles(req.files);


    await Promise.all(
      examData.payload.map(async (item) => {
        let exm;
        await Promise.all(
          item.exam.map(async (exam2) => {
            exm = await exam.findOne({
              where: {
                examName: Sequelize.where(
                  Sequelize.fn('LOWER', Sequelize.col('examName')),
                  Sequelize.fn('lower', exam2.examName)
                ),
                deleted: false,
              },
              include: [
                {
                  model: examFAQ,
                  required: false,
                  as: 'examFAQ',
                }
              ]

            });
          })
        )

        if (!exm) {
          let result;

          if (item.exam && item.exam.length > 0) {
            await Promise.all(item.exam.map(async (exam2) => {
              if (examLogoFile && examLogoFile.length > 0) {
                const fileExist = examLogoFile.find((image) => image.originalname);
                if (fileExist) {
                  console.log(fileExist, '0909090')
                  exam2.image = fileExist.originalname;
                }
                if (examLogoFile) exam2['examLogo'] = exam2.image;
              }
              result = await exam.create(exam2, { returning: true }, { transaction: t });
              return result
            })
            )
          }

          if (item.examAbouts && item.examAbouts.length > 0) {
            await Promise.all(item.examAbouts.map(async (about) => {
              about['examId'] = result.id;
              await examAbout.create(about, { returning: true }, { transaction: t });
            }))
          }
          if (item.examAdmitCards && item.examAdmitCards.length > 0) {
            await Promise.all(item.examAdmitCards.map(async (admitCard) => {
              admitCard['examId'] = result.id;
              await examAdmitCard.create(admitCard, { returning: true }, { transaction: t });
            }))
          }
          if (item.examCentre && item.examCentre.length > 0) {
            await Promise.all(item.examCentre.map(async (examcentre) => {
              examcentre['examId'] = result.id;
              await examCentres.create(examcentre, { returning: true }, { transaction: t });
            }))
          }
          if (item.examRegistrations && item.examRegistrations.length > 0) {
            await Promise.all(item.examRegistrations.map(async (registration) => {
              registration['examId'] = result.id;
              await examRegistration.create(registration, { returning: true }, { transaction: t });
            }))
          }
          if (item.examImportantDate && item.examImportantDate.length > 0) {
            await Promise.all(item.examImportantDate.map(async (importantDates) => {
              importantDates['examId'] = result.id;
              await examImportantDates.create(importantDates, { returning: true }, { transaction: t });
            }))
          }
          if (item.examReservations && item.examReservations.length > 0) {
            await Promise.all(item.examReservations.map(async (reservation) => {
              reservation['examId'] = result.id;
              await examReservation.create(reservation, { returning: true }, { transaction: t });
            }))
          }
          if (item.examEligibilities && item.examEligibilities.length > 0) {
            await Promise.all(item.examEligibilities.map(async (eligibility) => {
              eligibility['examId'] = result.id;
              await examEligibility.create(eligibility, { returning: true }, { transaction: t });
            }))
          }
          if (item.examPatterns && item.examPatterns.length > 0) {
            await Promise.all(item.examPatterns.map(async (pattern) => {
              pattern['examId'] = result.id;
              await examPattern.create(pattern, { returning: true }, { transaction: t });
            }))
          }
          if (item.examSyllabuss && item.examSyllabuss.length > 0) {
            await Promise.all(item.examSyllabuss.map(async (syllabus) => {
              syllabus['examId'] = result.id;
              await examSyllabus.create(syllabus, { returning: true }, { transaction: t });
            }))
          }
          if (item.examPreparationTip && item.examPreparationTip.length > 0) {
            await Promise.all(item.examPreparationTip.map(async (preparation) => {
              console.log(preparation, '89898989898')

              preparation['examId'] = result.id;
              await examPreparationTips.create(preparation, { returning: true }, { transaction: t });
            }))
          }
          if (item.examCounsellings && item.examCounsellings.length > 0) {
            await Promise.all(item.examCounsellings.map(async (counselling) => {
              counselling['examId'] = result.id;
              await examCounselling.create(counselling, { returning: true }, { transaction: t });
            }))
          }
          if (item.examParticipatingCollege && item.examParticipatingCollege.length > 0) {
            await Promise.all(item.examParticipatingCollege.map(async (participating) => {
              participating['examId'] = result.id;
              await examParticipatingColleges.create(participating, { returning: true }, { transaction: t });
            }))
          }
          if (item.examFAQ && item.examFAQ.length > 0) {
            await Promise.all(item.examFAQ.map(async (faq) => {
              if (imageFile && imageFile.length > 0) {
                const fileExist = imageFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == faq.uniqueId
                );
                if (fileExist) {
                  faq.image = fileExist.originalname;
                }
                if (imageFile) faq['image'] = faq.image;

              }
              faq['examId'] = result.id;
              await examFAQ.create(faq, { returning: true }, { transaction: t });
            }))
          }
          exam1.push(result);
          return result;
        }
        exam1.push({ examName: exam.examName, status: 'duplicate' });
      })
    );
    await t.commit();
    return { data: exam1, success: true };
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
};

const examList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };

    if (req.body.search) {
      const obj = {
        examName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('examName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = req.body.id
    }

    const result = await exam.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: collegeAssociateCourse,
          required: false,
          as: 'AssociateCourse',
             include: [
        {
          model: college,
          required: false,
          as: 'College',
          attributes:['id','collegeName']
        }
      
      ]
    },
        {
          model: mainStream,
          required: false,
          as: 'MainStream',
        },

        {
          model: masterFilter,
          required: false,
          as: 'CourseType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ExamType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ExamMode',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ApplicationMode',
        },
        {
          model: examAbout,
          required: false,
          as: 'ExamAbout',
        },
        {
          model: examAdmitCard,
          required: false,
          as: 'AdmitCard',
        },
        {
          model: examCentres,
          required: false,
          as: 'Centres',
        },
        {
          model: examCounselling,
          required: false,
          as: 'Counselling',
        },
        {
          model: examEligibility,
          required: false,
          as: 'Eligibility',
        },
        {
          model: examImportantDates,
          required: false,
          as: 'ImportantDates',
        },
        {
          model: examParticipatingColleges,
          required: false,
          as: 'ParticipatingCollege',
        },
        {
          model: examPattern,
          required: false,
          as: 'Pattern',
        },
        {
          model: examPreparationTips,
          required: false,
          as: 'PreparationTips',
        },
        {
          model: examRegistration,
          required: false,
          as: 'Registration',
        },
        {
          model: examReservation,
          required: false,
          as: 'Reservation',
        },
        {
          model: examSyllabus,
          required: false,
          as: 'Syllabus',
        },
        {
          model: examFAQ,
          required: false,
          where: { deleted: false },
          as: 'FAQ',
        }
      ],
      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });


    result["rows"] = result["rows"].map((row) => {
      row = row.toJSON();
      row["CollegeCount"] = row["AssociateCourse"].length;
      return row;
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const examDelete = async (req) => {
  try {
    const examdel = await exam.findOne({
      where: { id: req.id },
    });

    await examdel.update({ deleted: true });
    await examAbout.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examAdmitCard.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examCentres.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examCounselling.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examEligibility.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examFAQ.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examImportantDates.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examParticipatingColleges.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examPattern.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examPreparationTips.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examRegistration.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examReservation.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    await examSyllabus.update({ deleted: true }, {
      where: { examId: examdel.id },
    });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const examFAQDelete = async (req) => {
  try {
    const examdel = await examFAQ.findOne({
      where: { examId: req.body.examId, id: req.body.id },
    });
    await examdel.update({ deleted: true });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const updateExam = async (req) => {
  try {
    const result = [];

    const examData = JSON.parse(req.body.examData);
    const { examLogoFile, imageFile } = req.files;




    const exm = await exam.findOne({
      where: {
        examName: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('examName')),
          Sequelize.fn('lower', examData.examName)
        ),
        deleted: false,
      },
      include: [
        {
          model: examFAQ,
          required: false,
          as: 'examFAQ',
        }
      ]
    });


    await writeFiles(req.files);

    if (examLogoFile && examLogoFile.length > 0) {
      const fileExist = examLogoFile.find(
        (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == examData.uniqueId
      );
      if (fileExist) {
        if (exm && exm.examLogo)
          if (fs.existsSync(path.resolve(dir, `${exm.examLogo}`))) {
            fs.unlinkSync(path.resolve(dir, `${exm.examLogo}`));
          }

        examData['examLogo'] = fileExist.originalname;
      }
    }

    if (exm && exm.examName === examData.examName) {
      console.log('duplicate')
      result.push({ examName: examData.examName, status: 'duplicate' });

    } else {
      const updateData = await exam.update(examData, { where: { id: examData.id }, returning: true })
      if (examData.examAbouts) {
        if (examData.examAbouts.id) {
          await examAbout.update(examData.examAbouts, { where: { id: examData.examAbouts.id }, returning: true })

        } else {
          examData.examAbouts['examId'] = examData.id;
          await examAbout.create(examData.examAbouts)
        }
      };

      if (examData.examAdmitCards) {
        if (examData.examAdmitCards.id) {
          await examAdmitCard.update(examData.examAdmitCards, { where: { id: examData.examAdmitCards.id }, returning: true })
        } else {
          examData.examAdmitCards['examId'] = examData.id;
          await examAdmitCard.create(examData.examAdmitCards)
        }
      };

      if (examData.examCentre) {
        if (examData.examCentre.id) {
          await examCentres.update(examData.examCentre, { where: { id: examData.examCentre.id }, returning: true })

        } else {
          examData.examCentre['examId'] = examData.id;
          await examCentres.create(examData.examCentre)
        }
      };

      if (examData.examCounsellings) {
        if (examData.examCounsellings.id) {
          await examCounselling.update(examData.examCounsellings, { where: { id: examData.examCounsellings.id }, returning: true })
        } else {
          examData.examCounsellings['examId'] = examData.id;
          await examCounselling.create(examData.examCounsellings)
        }
      }

      if (examData.examEligibilities) {
        if (examData.examEligibilities.id) {
          await examEligibility.update(examData.examEligibilities, { where: { id: examData.examEligibilities.id }, returning: true })
        } else {
          examData.examEligibilities['examId'] = examData.id;
          await examEligibility.create(examData.examEligibilities)
        }
      }

      if (examData.examImportantDate) {
        if (examData.examImportantDate.id) {
          await examImportantDates.update(examData.examImportantDate, { where: { id: examData.examImportantDate.id }, returning: true })
        } else {
          examData.examImportantDate['examId'] = examData.id;
          await examImportantDates.create(examData.examImportantDate)
        }
      }

      if (examData.examParticipatingCollege) {
        if (examData.examParticipatingCollege.id) {
          await examParticipatingColleges.update(examData.examParticipatingCollege, { where: { id: examData.examParticipatingCollege.id }, returning: true })
        } else {
          examData.examParticipatingCollege['examId'] = examData.id;
          await examParticipatingColleges.create(examData.examParticipatingCollege)
        }
      }

      if (examData.examPatterns) {
        if (examData.examPatterns.id) {
          await examPattern.update(examData.examPatterns, { where: { id: examData.examPatterns.id }, returning: true })
        } else {
          examData.examPatterns['examId'] = examData.id;
          await examPattern.create(examData.examPatterns)
        }
      }
      if (examData.examPreparationTip) {
        if (examData.examPreparationTip.id) {
          await examPreparationTips.update(examData.examPreparationTip, { where: { id: examData.examPreparationTip.id }, returning: true })
        } else {
          examData.examPreparationTip['examId'] = examData.id;
          await examPreparationTips.create(examData.examPreparationTip)
        }
      }

      if (examData.examRegistrations) {
        if (examData.examRegistrations.id) {
          await examRegistration.update(examData.examRegistrations, { where: { id: examData.examRegistrations.id }, returning: true })
        } else {
          examData.examRegistrations['examId'] = examData.id;
          await examRegistration.create(examData.examRegistrations)
        }
      }

      if (examData.examReservations) {
        if (examData.examReservations.id) {
          await examReservation.update(examData.examReservations, { where: { id: examData.examReservations.id }, returning: true })
        } else {
          examData.examReservations['examId'] = examData.id;
          await examReservation.create(examData.examReservations)
        }
      }

      if (examData.examSyllabuss) {
        if (examData.examSyllabuss.id) {
          await examSyllabus.update(examData.examSyllabuss, { where: { id: examData.examSyllabuss.id }, returning: true })
        } else {
          examData.examSyllabuss['examId'] = examData.id;
          await examSyllabus.create(examData.examSyllabuss)
        }
      }

      await Promise.all(
        examData.faq.map(async (faqItem) => {

          let faqExam;
          if (exm && exm.examFAQ) {
            await Promise.all(

              exm.examFAQ.map(async (item3) => {
                faqExam = await examFAQ.findOne({ where: { id: item3.id } })

              })
            )
          }

          await writeFiles(req.files);

          if (imageFile && imageFile.length > 0) {

            const fileExist = imageFile.find(
              (image) => image.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == faqItem.uniqueId
            );

            if (fileExist) {

              if (faqExam && faqExam.image)

                if (fs.existsSync(path.resolve(dir, `${faqExam.image}`)))
                  fs.unlinkSync(path.resolve(dir, `${faqExam.image}`));

              faqItem.image = fileExist.originalname;
            }

            if (imageFile) faqItem['image'] = faqItem.image;
          }
          if (faqItem.id) {
            await examFAQ.update(faqItem, { where: { id: faqItem.id }, returning: true })
          } else {
            faqItem['examId'] = examData.id;
            await examFAQ.create(faqItem)
          }

        })
      )

      result.push(updateData)
    }

    return { data: result, success: true };
  } catch (error) {
    // console.log(error, '98989898989')
    return { data: null, message: error.message, success: false };
  }
};

/////this api for filters of exams and college count /////////
const examByStreamCourse = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    let wherecond = { deleted: false };


    let result;
    if (req.body.mainStreamId) {
      whrCondition = { mainStreamId: req.body.mainStreamId }
    }
    if (req.body.entranceExamId) {
      wherecond = { ['$courses.entranceExamId$']: req.body.entranceExamId }
    }
    let applicationMode;
    if (req.body.applicationModeId) {
      applicationMode = {
        applicationModeId: req.body.applicationModeId,
      };
    }

    let examMode;
    if (req.body.examModeId) {
      examMode = {
        examModeId: req.body.examModeId,
      };
    }
    let examType;
    if (req.body.examTypeId) {
      examType = {
        examTypeId: req.body.examTypeId,
      };
    }

     result = await exam.findAndCountAll({
      where: { [Op.and]: [whrCondition, examMode, applicationMode, examType, wherecond] },
      subQuery: false,
      include: [
        {
          model: collegeAssociateCourse,
          required: false,
          as: 'AssociateCourse',
             include: [
        {
          model: college,
          required: false,
          as: 'College',
          attributes:['id','collegeName']
        }
      ]

        },
        {
          model: mainStream,
          required: false,
          as: 'MainStream',

        },
        {
          model: course,
          required: false,
          as: 'courses',
        },
        {
          model: masterFilter,
          required: false,
          as: 'CourseType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ExamType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ExamMode',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ApplicationMode',
        },
        {
          model: examAbout,
          required: false,
          as: 'ExamAbout',
        },
        {
          model: examAdmitCard,
          required: false,
          as: 'AdmitCard',
        },
        {
          model: examCentres,
          required: false,
          as: 'Centres',
        },
        {
          model: examCounselling,
          required: false,
          as: 'Counselling',
        },
        {
          model: examEligibility,
          required: false,
          as: 'Eligibility',
        },
        {
          model: examImportantDates,
          required: false,
          as: 'ImportantDates',
        },
        {
          model: examParticipatingColleges,
          required: false,
          as: 'ParticipatingCollege',
        },
        {
          model: examPattern,
          required: false,
          as: 'Pattern',
        },
        {
          model: examPreparationTips,
          required: false,
          as: 'PreparationTips',
        },
        {
          model: examRegistration,
          required: false,
          as: 'Registration',
        },
        {
          model: examReservation,
          required: false,
          as: 'Reservation',
        },
        {
          model: examSyllabus,
          required: false,
          as: 'Syllabus',
        },
        {
          model: examFAQ,
          required: false,
          where: { deleted: false },
          as: 'FAQ',
        },


      ],
      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']]
    });

    result["rows"] = result["rows"].map((row) => {
      row = row.toJSON();
      row["CollegeCount"] = row["AssociateCourse"].length;
      return row;
    });





    return { data:result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const allExamList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;

    let whrCondition = { deleted: false };
    let wherecond = { deleted: false };

    if (req.body.search) {
      const obj = {
        examName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('examName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    if (req.body.id) {
      whrCondition = req.body.id
    }
    if (req.body.mainStreamId) {
      whrCondition = { mainStreamId: req.body.mainStreamId }
    }
    if (req.body.entranceExamId) {
      wherecond = { ['$courses.entranceExamId$']: req.body.entranceExamId }
    }

    let applicationMode;
    if (req.body.applicationModeId) {
      applicationMode = {
        applicationModeId: req.body.applicationModeId,
      };
    }

    let examMode;
    if (req.body.examModeId) {
      examMode = {
        examModeId: req.body.examModeId,
      };
    }
    let examType;
    if (req.body.examTypeId) {
      examType = {
        examTypeId: req.body.examTypeId,
      };
    }

    const result = await exam.findAndCountAll({
      where: { [Op.and]: [whrCondition, examMode, applicationMode, examType, wherecond] },
      subQuery: false,
      include: [
    //     {
    //       model: collegeAssociateCourse,
    //       required: false,
    //       as: 'AssociateCourse',
    //          include: [
    //     {
    //       model: college,
    //       required: false,
    //       as: 'College',
    //       attributes:['id','collegeName']
    //     }
    //   ]
    // },
        {
          model: mainStream,
          required: false,
          as: 'MainStream',
        },
        {
          model: course,
          required: false,
          as: 'courses',
        },
        {
          model: masterFilter,
          required: false,
          as: 'CourseType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ExamType',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ExamMode',
        },
        {
          model: masterFilter,
          required: false,
          as: 'ApplicationMode',
        },
        {
          model: examImportantDates,
          required: false,
          as: 'ImportantDates',
        }
      ],
      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });

    // result["rows"] = result["rows"].map((row) => {
    //   row = row.toJSON();
    //   row["CollegeCount"] = row["AssociateCourse"].length;
    //   return row;
    // });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
  addExam,
  examList,
  examDelete,
  updateExam,
  examByStreamCourse,
  allExamList,
  examFAQDelete

};
