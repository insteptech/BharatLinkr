/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
// const fs = require('fs');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { query } = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const excelJS = require('exceljs');
const { STATUS } = require('../utils/helper');
const { masterFilter, Status, course, exam, college, collegeAgency, collegeAssociateCourse, collegeAssociateStream, mainStream } = require('../../models');

const { status } = require('../../config/config');

const writeFiles = async ({ imageFile, pdfFile }) => {
  const baseDir = path.join(__dirname, '../../');

  const dir = `${baseDir}/documents`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (imageFile && imageFile.length > 0) {
    await Promise.all(
      imageFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }
  if (pdfFile && pdfFile.length > 0) {
    await Promise.all(
      pdfFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded3'));
      })
    );
  }
};

const addMasterFilter = async (req) => {
  try {
    console.log(req.body);
    const masterFilter1 = [];
    const masterData = JSON.parse(req.body.masterData);

    const { imageFile, pdfFile } = req.files;
    console.log(req.files, 'req.filesreq.files');

    await writeFiles(req.files);

    await Promise.all(
      masterData.payload.map(async (item) => {

        if (imageFile && imageFile.length > 0) {
          const fileExist = imageFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == item.uniqueId
          );
          if (fileExist) {
            item.image = fileExist.originalname;
          }
        }
        if (pdfFile && pdfFile.length > 0) {
          const fileExist = pdfFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == item.uniqueId
          );
          if (fileExist) {
            item.pdf = fileExist.originalname;
          }
        }

        const master = await masterFilter.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)), 
            deleted: false,
            types: item.types
          },
        });
       

        if (!master) {
            const result = await masterFilter.create({ ...item, returning: true });
            masterFilter1.push(result);
            return result;
          }


          masterFilter1.push({ name: item.name, status: 'duplicate' });

          
        })
        );
        return { data: masterFilter1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const getMasterFilterById = async (req) => {
    try {
      console.log(query, '1222222222222');
  
      const master = await masterFilter.findOne({
        where: { id: req.id },
        include: [
          {
            model: Status,
            required: false,
            as: 'Status',
            attributes: ['name', 'id'],
          },
        ],
      });
      return { data: master, success: true };
    } catch (error) {
      throw new Error(error);
    }
  };


  const getMasterFilter = async (req) => {
    try {
      const pageNo = req.query.pageNo ? req.query.pageNo : 1;
      const size = req.query.pageSize ? req.query.pageSize : 20;
      const whrCondition = { deleted: false };
      if (req.body.search) {
        whrCondition.name = Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('masterFilter.name')),
          'LIKE',
          `%${req.body.search.toLowerCase()}%`
        );
      }
      if (req.query.types) {
   
        whrCondition.types = req.query.types
      }
      console.log(whrCondition,"whrCondition")
      const result = await masterFilter.findAndCountAll({
        where: whrCondition,
        order: [['id', 'DESC']],
        include: [
          {
            model: Status,
            required: false,
            as: 'Status',
            attributes: ['name', 'id'],
          },
   
        ],
  
        offset: (pageNo - 1) * size,
        limit: size,
      });
  
      return { data: result, success: true };
    } catch (error) {
      return { data: null, message: error.message, success: false };
    }
  };


  const getMasterFilterDropDown = async (req) => {
    try {
      const status = await Status.findOne({
        where: { name: STATUS.ENABLE },
      });
      const result = await masterFilter.findAll({
        where: {
          types: { [Op.or]: req.query.types.split(',') },
          deleted: false,
          statusId: status.id,
        },
      });
      const groupByCategory = result.reduce((group, item) => {
        const { types } = item;
        group[types] = group[types] || [];
        group[types].push(item);
        return group;
      }, {});
      
      return { data: groupByCategory, success: true };
    } catch (error) {
      throw new Error(error);
    }
  };



  const updateMasterFilter = async (req) => {
    try {
      const result = [];
  
      const masterData = JSON.parse(req.body.masterData);
  
      const { imageFile, pdfFile } = req.files;
      await writeFiles(req.files);
  
      const baseDir = path.join(__dirname, '../../');
      const dir = `${baseDir}/documents`;
      await Promise.all(
        masterData.payload.map(async (item) => {
          const master = await masterFilter.findOne({
            where: {
              id: Number(item.id),
              deleted:false
            },
          });
          if (imageFile && imageFile.length > 0) {
            const fileExist = imageFile.find(
              (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == item.uniqueId
            );
            if (fileExist) {
              if (master && master.image)
                if (fs.existsSync(path.resolve(dir, `${master.image}`))) {
                  fs.unlinkSync(path.resolve(dir, `${master.image}`));
                }
  
              item.image = fileExist.originalname;
            }
          }
          if (pdfFile && pdfFile.length > 0) {
            const fileExist = pdfFile.find(
              (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == item.uniqueId
            );
            if (fileExist) {
              if (master && master.pdf)
                if (fs.existsSync(path.resolve(dir, `${master.pdf}`))) fs.unlinkSync(path.resolve(dir, `${master.pdf}`));
  
              item.pdf = fileExist.originalname;
            }
          }
          const prg = await masterFilter.findOne({
            where: {
              name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)),
              types: item.types,
              deleted: false,
            },
          });
          if (prg && prg.id !== item.id) {
            throw new Error('Duplicate data cannot be added!');
          } else {
            await masterFilter.update(item, {
              where: { id: item.id },
              returning: true,
            });
          }
          result.push(item);
        })
      );
  
      return { data: result, success: true };
    } catch (error) {
      return { data: null, message: error.message, success: false };
    }
  };



  const masterFilterDelete = async (req) => {
    try {
      const master = await masterFilter.findOne({
        where: { id: req.id },
      });
  
      const inCourse = await course.findOne({
        where: {
          [Op.or]: [
            { courseTypeId: req.id },
            // { courseDurationId: req.id },
            { courseCategoryId: req.id },
            { eligibility: req.id },
            { courseLevelId: req.id },
          ],
          deleted: false,
        },
      });
      const inExam = await exam.findOne({
        where: {
          [Op.or]: [
            { examTypeId: req.id },
            { examModeId: req.id },
            { courseTypeId: req.id },
            { applicationModeId: req.id },
          ],
          deleted: false,
        },
      });
  
      const inCollege = await college.findOne({
        where: {
          [Op.or]: [
            { chooseAffiliationId: req.id },
            { collegeTypeId: req.id },
            { chooseApprovalId: req.id },
          ],
          deleted: false,
        },
      });

      const inCollegeAgency = await collegeAgency.findOne({
        where: {
          [Op.or]: [
            { collegeAgencyId: req.id }
          ],
          deleted: false,
        },
      });

      const inCollegeAssociateCourse = await collegeAssociateCourse.findOne({
        where: {
          [Op.or]: [
            { courseTypeId: req.id },
            { coursePlaceId: req.id },
            { programTypeId: req.id },
            { courseCategoryId: req.id },
            { courseLevel: req.id },
          ],
          deleted: false,
        },
      });

      // const inCollegeAssociateStream = await collegeAssociateStream.findOne({
      //   where: {
      //     [Op.or]: [
      //       { courseFeeDetailsId: req.id }
      //     ],
      //     deleted: false,
      //   },
      // });

      if (inExam || inCourse || inCollege || inCollegeAgency || inCollegeAssociateCourse ) {
        throw new Error(`Sorry can't delete. As it is releated with
        ${inExam ? 'Exam,' : inCourse ? 'Course,' : inCollege ? 'College': inCollegeAgency ? 'College': inCollegeAssociateCourse ? 'College':  ''}`);
      }
      await master.update({ deleted: true });
      return { success: true };
    } catch (error) {
      return { data: null, message: error.message, success: false };
    }
  };

  const getMasterFilterByCourseLevel = async (req) => {
    try {
      const status = await Status.findOne({
        where: { name: STATUS.ENABLE },
      });
      const result = await masterFilter.findAll({
        where: {
          types: { [Op.or]: req.query.types.split(',') },
          deleted: false,
          statusId: status.id,
        },

        include:[
          {
            model: course,
            required:false,
            as:'CourseLevel',
            include:[
              {
                model: mainStream,
                required:false,
                as:'MainStreamsss',
              }
            ]
          }
        ]
      });

      const countDetail = await course.findAll({
        attributes: [[Sequelize.fn('count', Sequelize.col('courseLevelId')), 'CourseCount']],
        include: [
          {
            model: masterFilter,
            required: false,
            as:'courselevelType'
          },
     
        ],
        group: ['courseLevelId','courselevelType.id'],
      });

      return { data:countDetail, success: true };
    } catch (error) {
      throw new Error(error);
    }
  };



module.exports = {
    addMasterFilter,
    getMasterFilterById,
    getMasterFilter,
    getMasterFilterDropDown,
    updateMasterFilter,
    masterFilterDelete,
    getMasterFilterByCourseLevel

};
