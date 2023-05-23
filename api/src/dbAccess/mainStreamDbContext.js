const { mainStream, subStream, colStream, course, exam } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');


const addMainStream = async (req) => {
  try {
    const stream1 = [];
    await Promise.all(
      req.body.stream.map(async (item) => {
        const prg = await mainStream.findOne({ where: { mainStreamName: item.mainStreamName, deleted: false } });
        if (!prg) {
          const result = await mainStream.create({ ...item, returning: true });
          stream1.push(result);
          return result;
        }
        stream1.push({ mainStreamName: item.mainStreamName, status: 'duplicate' });
      })
    );
    return { data: stream1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const mainStreamList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        mainStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mainStreamName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    console.log(whrCondition,"whrCondition")

    const result = await mainStream.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: course,
          required: false,
          as: 'coursess',
        },
      ],
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

const streamDelete = async (req) => {
  try {
    const streamdel = await mainStream.findOne({
      where: { id: req.id },
    });
    const inSubStream = await subStream.findOne({
      where: {
        [Op.or]: [
          { mainStreamId: req.id }

        ],
        deleted: false,
      },
    });

    const inColStream = await colStream.findOne({
      where: {
        [Op.or]: [
          { mainStreamId: req.id },

        ],
        deleted: false,
      },
    });

    const inCourse = await course.findOne({
      where: {
        [Op.or]: [
          { mainStreamId: req.id },

        ],
        deleted: false,
      },
    });

    const inExam = await exam.findOne({
      where: {
        [Op.or]: [
          { mainStreamId: req.id },

        ],
        deleted: false,
      },
    });

    if (inSubStream || inColStream || inCourse || inExam) {
      throw new Error(`Sorry can't delete. As it is releated with
      ${inSubStream ? 'SubStream,' : inColStream ? 'ColStream,' : inCourse ? 'Course,' : inExam ? 'Exam,' : ''}`);
    }

    await streamdel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateStream = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.mainStream.map(async (item) => {
        const prg = await mainStream.findOne({
          where: {
            mainStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mainStreamName')), Sequelize.fn('lower', item.mainStreamName)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('MainStream Already exists');
        } else {
          const res = await mainStream.update(
            { ...item },
            {
              returning: true,
              where: { id: item.id },
            }
          );
          result.push(res)
        }
      })
    );

    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }

};


const streamActive = async (req) => {
  try {
    const streamm = await mainStream.findOne({
      where: { id: req.id },
    });
    await streamm.update({ active: false });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const mainStreamById = async (req) => {
  try {
    const stream = await mainStream.findOne({
      where: { id: req.id, deleted: false }
    });
    return { stream };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  addMainStream,
  streamDelete,
  mainStreamList,
  updateStream,
  streamActive,
  mainStreamById
};
