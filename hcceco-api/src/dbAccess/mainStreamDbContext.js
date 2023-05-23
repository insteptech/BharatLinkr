const { mainStream } = require('../../models');
const Sequelize = require('sequelize');

const addMainStream = async (req) => {
  try {
    const stream1 = [];
    await Promise.all(
      req.body.stream.map(async (item) => {
        const prg = await mainStream.findOne({ where: { mainStreamName: item.mainStreamName } });
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
    
        const result = await mainStream.findAndCountAll({
          where: whrCondition,
          offset: (pageNo - 1) * size,
          limit: size,
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
    await streamdel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateStream = async (req) => {
  try {
    const result = await mainStream.update(
      { mainStreamName: req.body.mainStreamName },
      {
        returning: true,
        where: { id: req.body.id },
      }
    );

    return { result, success: true };
  } catch (error) {
    return { data: null, success: false };
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


const mainStreamById = async(req) =>{
    try{
        const stream = await mainStream.findOne({
            where:{id:req.id, deleted:false}
        });
        return{stream};
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    addMainStream,
  streamDelete,
  mainStreamList,
  updateStream,
  streamActive,
  mainStreamById,
};
