const masterFilterDbContext = require('../dbAccess/masterFilterDbContext');

const addMasterFilter = async function (req) {
  let master = null;
  const result = await masterFilterDbContext.addMasterFilter(req);

  if (result.success) {
    master = result.data;
    return { data: { master }, success: true };
  }
  
  return result;
};


const getMasterFilterById = async function (req) {
  const result = await masterFilterDbContext.getMasterFilterById(req);
  return result;
};

const getMasterFilter = async function (req) {
  const result = await masterFilterDbContext.getMasterFilter(req);
  return result;
};

const getMasterFilterDropDown = async function (req) {
  const result = await masterFilterDbContext.getMasterFilterDropDown(req);
  return result;
};

const updateMasterFilter = async function (req) {
  const result = await masterFilterDbContext.updateMasterFilter(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const masterFilterDelete = async function (req) {
  //   console.log(body, '><><><><><><><><><>');
  const result = await masterFilterDbContext.masterFilterDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const getMasterFilterByCourseLevel = async function (req) {
  const result = await masterFilterDbContext.getMasterFilterByCourseLevel(req);
  return result;
};

const getMasterFilterSampleFile = async function (req,res) {
  const result = await masterFilterDbContext.getMasterFilterSampleFile(req,res);
  return result;
};

const getMasterFilterDataExcelByType = async function (req,res) {
  const result = await masterFilterDbContext.getMasterFilterDataExcelByType(req,res);
  return result;
};

const addMasterFilterDataByExcel = async function (req,res) {
  const result = await masterFilterDbContext.addMasterFilterDataByExcel(req,res);
  return result;
};





module.exports = {
    addMasterFilter,
    getMasterFilterById,
    getMasterFilter,
    getMasterFilterDropDown,
    updateMasterFilter,
    masterFilterDelete,
    getMasterFilterByCourseLevel,
    getMasterFilterSampleFile,
    getMasterFilterDataExcelByType,
    addMasterFilterDataByExcel

}  