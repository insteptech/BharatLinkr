const { subStream, mainStream, colStream } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const addSubStream = async (req) => {
  try {
    const subStream1 = [];
    const mainStreamId = req.body.mainStreamId
    await Promise.all(
      req.body.substream.map(async (item) => {
        const prg = await subStream.findOne({ where: { subStreamName: item.subStreamName, deleted:false } });
        if (!prg) {
          const result = await subStream.create({ ...item, mainStreamId, returning: true });
          subStream1.push(result);
          return result;
        }
        subStream1.push({ subStreamName: item.subStreamName, status: 'duplicate' });
      })
    );
    return { data: subStream1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const subStreamList = async (req) => {
    try {
        const pageNo = req.body.pageNo ? req.body.pageNo : 1;
        const size = req.body.pageSize ? req.body.pageSize : 10;
        let whrCondition = { deleted: false };
        if(req.body.id || req.body.mainStreamId){
          whrCondition = req.body.id || {mainStreamId:req.body.mainStreamId, deleted: false }

        }
        if (req.body.search) {
          const obj = {
            subStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('subStreamName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
          };
          whrCondition = { ...obj, ...whrCondition };
        }
        const result = await subStream.findAndCountAll({
          where: whrCondition,
          include:[
            {
              model: mainStream,
              required: false,
              as: 'MainStream',
              
            }
          ],
          offset: (pageNo - 1) * size,
          limit: size,
        });
        return { data: result, success: true };
      } catch (error) {
        throw new Error(error);
      }
};

const subStreamDelete = async (req) => {
  try {
    const streamdel = await subStream.findOne({
      where: { id: req.id },
    });

    const inColStream = await colStream.findOne({
      where: {
        [Op.or]: [
          { subStreamId: req.id },

        ],
        deleted: false,
      },
    });

    if ( inColStream) {
      throw new Error(`Sorry can't delete. As it is releated with
      ${ inColStream ? 'ColStream,' : ''}`);
    }

    await streamdel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateSubStream = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.subStream.map(async (item) => {
        const prg = await subStream.findOne({
          where: {
            subStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('subStreamName')), Sequelize.fn('lower', item.subStreamName)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('SubStream Already exists');
        } else {
         const res =  await subStream.update(
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
const subStreamActive = async (req) => {
  try {
    const streamm = await subStream.findOne({
      where: { id: req.id },
    });
    await streamm.update({ active: false });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const subStreamById = async(req) =>{
    try{
        const stream = await subStream.findOne({
            where:{id:req.id, deleted:false},
            include:[
              {
                model: mainStream,
                required: false,
                as: 'MainStream',
                
              }
            ]
        });
        return{stream};
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    addSubStream,
    subStreamList,
    subStreamDelete,
    updateSubStream,
    subStreamActive,
    subStreamById,
};
