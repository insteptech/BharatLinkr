const { subStream, mainStream } = require('../../models');
const Sequelize = require('sequelize');

const addSubStream = async (req) => {
  try {
    const subStream1 = [];
    await Promise.all(
      req.body.substream.map(async (item) => {
        const prg = await subStream.findOne({ where: { subStreamName: item.subStreamName }, mainStreamId: item.mainStreamId, });
        if (!prg) {
          const result = await subStream.create({ ...item, returning: true });
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
    await streamdel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateSubStream = async (req) => {
  try {
    const result = await subStream.update(
      { subStreamName: req.body.subStreamName },
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
