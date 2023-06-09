const { subStream, mainStream, colStream } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const addColStream = async (req) => {
  try {
    const colStream1 = [];
    const {mainStreamId, subStreamId} = req.body
    await Promise.all(
      req.body.colstream.map(async (item) => {
        const prg = await colStream.findOne({ where: { colStreamName: item.colStreamName,deleted:false }});
        console.log(!prg,'98989898')
        if (!prg) {
          const result = await colStream.create({ ...item, mainStreamId, subStreamId,  returning: true });
          colStream1.push(result);
          return result;
        }
        colStream1.push({ colStreamName: item.colStreamName, status: 'duplicate' });
      })
    );
    return { data: colStream1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const colStreamList = async (req) => {
  try {
      const pageNo = req.body.pageNo ? req.body.pageNo : 1;
      const size = req.body.pageSize ? req.body.pageSize : 10;
      let whrCondition = { deleted: false };
      if(req.body.id){
        whrCondition = {id:req.body.id }
      }
      if (req.body.search) {
        const obj = {
          colStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('colStreamName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
        };
        whrCondition = { ...obj, ...whrCondition };
      }

      let sub = {};
      if(req.body.subStreamId ){
        sub ={subStreamId:req.body.subStreamId}
      }

  
      const result = await colStream.findAndCountAll({
        where: { [Op.and]: [sub, whrCondition] },
        include:[
          {
            model: mainStream,
            required: false,
            as: 'MainStream',
            
          },
          {
            model: subStream,
            required: false,
            as: 'SubStream',
            
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
const colStreamDelete = async (req) => {
  try {
    const colstream1 = await colStream.findOne({
      where: { id: req.id },
    });
    await colstream1.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateColStream = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.colStream.map(async (item) => {
        const prg = await colStream.findOne({
          where: {
            colStreamName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('colStreamName')), Sequelize.fn('lower', item.colStreamName)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('ColStream Already exists');
        } else {
         const res =  await colStream.update(
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
const colStreamActive = async (req) => {
  try {
    const streamm = await colStream.findOne({
      where: { id: req.id },
    });
    await streamm.update({ active: false });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const colStreamById = async(req) =>{
    try{
        const stream = await colStream.findOne({
            where:{id:req.id, deleted:false},
            include:[
              {
                model: mainStream,
                required: false,
                as: 'MainStream',
                
              },
              {
                model: subStream,
                required: false,
                as: 'SubStream',
                
              }

            ]
        });
        return{stream};
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
  addColStream,
  colStreamList,
  colStreamDelete,
  updateColStream,
  colStreamActive,
  colStreamById,
};
