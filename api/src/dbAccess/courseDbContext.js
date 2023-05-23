const { mainStream, course, masterFilter, exam, sequelize, courseCMS } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');


const addCourse = async (req) => {
  try {
    const t = await sequelize.transaction();
    const course1 = [];
    await Promise.all(
      req.body.Course.map(async (item) => {
        const prg = await course.findOne({ where: { courseName: item.courseName, deleted: false } });
        if (!prg) {
          const result = await course.create({ ...item, returning: true });
          if (item.CMS && item.CMS.length > 0) {
            await Promise.all(item.CMS.map(async (cms) => {
              cms['courseId'] = result.id;
              await courseCMS.create(cms, { returning: true }, { transaction: t });
            }))
          }
          course1.push(result);
          return result;
        }
        course1.push({ courseName: item.courseName, status: 'duplicate' });
      })
    );
    return { data: course1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const courseList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        courseName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('courseName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    if(req.body.mainStreamId){
      whrCondition = {mainStreamId: req.body.mainStreamId}
    }


    if (req.body.id) {
      whrCondition = req.body.id
    }

    const result = await course.findAndCountAll({
      where: whrCondition,
      include: [
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
          as: 'CourseCategory',
        },
        {
          model: masterFilter,
          required: false,
          as: 'Eligibility',
        },

        {
          model: exam,
          required: false,
          as: 'EntranceExam',
        },
        {
          model: masterFilter,
          required: false,
          as: 'courseLevel',
        },
        {
          model: courseCMS,
          required: false,
          as: 'CMS',
        },

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


const courseDelete = async (req) => {
  try {
    const coursedel = await course.findOne({
      where: { id: req.id },
    });

    await coursedel.update({ deleted: true });
    await courseCMS.update({ deleted: true }, {
      where: { courseId: coursedel.id },
    });


    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const updateCourse = async (req) => {
  try {
    const result = [];
    const courseData = req.body;
    console.log(req.body, '9898989898989')
    const course1 = await course.findOne({
      where: {
        courseName: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('courseName')),
          Sequelize.fn('lower', courseData.courseName)
        ),
        deleted: false,
      },
    });


    if (course1 && course1.courseName === courseData.courseName) {
      console.log('duplicate')
      result.push({ courseName: courseData.courseName, status: 'duplicate' });

    } else {
      const updateData = await course.update(courseData, { where: { id: courseData.id }, returning: true })
      await Promise.all(
        courseData.cms.map(async (item) => {
          await courseCMS.update(item, { where: { courseId: courseData.id }, returning: true })
        })
      )


      result.push(updateData)
      console.log('successs')
    }


    return { data: result, success: true };
  } catch (error) {
    console.log("errrr", error)
    return { data: null, message: error.message, success: false };
  }
};



const courseByStream = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    let wherecond = { deleted: false };

    if (req.body.mainStreamId) {
      whrCondition = { mainStreamId: req.body.mainStreamId }
    }

    if (req.body.courseLevelId) {
      wherecond = { courseLevelId: req.body.courseLevelId }
    }

  

    const result = await course.findAndCountAll({
      where: { [Op.and]: [whrCondition, wherecond] },
      include: [
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
          as: 'CourseCategory',
        },
        {
          model: masterFilter,
          required: false,
          as: 'Eligibility',
        },

        {
          model: exam,
          required: false,
          as: 'EntranceExam',
        },
        {
          model: masterFilter,
          required: false,
          as: 'courseLevel',
        },
        {
          model: courseCMS,
          required: false,
          as: 'CMS',
        },

      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });

    const mainStreamCountss = await course.findAll({
      attributes: [[Sequelize.fn('count', Sequelize.col('mainStreamId')), 'mainStreamCount']],
      include: [
        {
          model: mainStream,
          required: false,
          as: 'mainStreamCounts',
        },
      ],
      group: ['mainStreamId', 'mainStreamCounts.mainStreamName',
       'mainStreamCounts.deleted', 'mainStreamCounts.active', 'mainStreamCounts.id'],
    });

    console.log(mainStreamCountss, "mainStreamCountsss")

    return { data: result,mainStreamCountss, success: true };
  } catch (error) {
    throw new Error(error);
  }
};





module.exports = {
  addCourse,
  courseList,
  courseDelete,
  updateCourse,
  courseByStream,


};
