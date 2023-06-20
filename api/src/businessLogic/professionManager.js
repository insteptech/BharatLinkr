const professionDbContext = require('../dbAccess/professionDbContext');

const addFamily = async function (req) {
  let stream = null;
  const result = await professionDbContext.addFamily(req);
  if (result.success) {
    stream = result.data;
    return { data: { stream }, success: true };
  }
};

const familyCodeList = async function (req) {
  const result = await professionDbContext.familyCodeList(req);
  return result;
};

const familyCodeDelete = async function (req) {
  const result = await professionDbContext.familyCodeDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const updateFamily = async function (req) {
  const result = await professionDbContext.updateFamily(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const familyCodeActive = async function (req) {
  const result = await professionDbContext.familyCodeActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

//------------------------------Family Code--------------------------//

const addProfession = async function (req) {
    let stream = null;
    const result = await professionDbContext.addProfession(req);
    if (result.success) {
      stream = result.data;
      return { data: { stream }, success: true };
    }
  };
  
  const professionCodeList = async function (req) {
    const result = await professionDbContext.professionCodeList(req);
    return result;
  };
  
  const professionCodeDelete = async function (req) {
    const result = await professionDbContext.professionCodeDelete(req);
  
    if (result.success) {
      return { data: { result }, success: true };
    }
    return result;
  };
  const updateProfessionCode = async function (req) {
    const result = await professionDbContext.updateProfessionCode(req);
    if (result.success) {
      return { data: { result }, success: true };
    }
    return result;
  };
  const professionCodeActive = async function (req) {
    const result = await professionDbContext.professionCodeActive(req);
  
    if (result.success) {
      return { data: { result }, success: true };
    }
    return result;
  };


  const addProfessionRegister = async function (req) {
    let stream = null;
    const result = await professionDbContext.addProfessionRegister(req);
    if (result.success) {
      stream = result.data;
      return { data: { stream }, success: true };
    }
  };

  const professionRegisterList = async function (req) {
    const result = await professionDbContext.professionRegisterList(req);
    return result;
  };

  const updateProfessionRegister = async function (req) {
    const result = await professionDbContext.updateProfessionRegister(req);
    if (result.success) {
      return { data: { result }, success: true };
    }
    return result;
  };

  const professionRegisterDelete = async function (req) {
    const result = await professionDbContext.professionRegisterDelete(req);
  
    if (result.success) {
      return { data: { result }, success: true };
    }
    return result;
  };

module.exports = {
    addFamily,
    familyCodeList,
  familyCodeDelete,
  updateFamily,
  familyCodeActive,
  addProfession,
  professionCodeList,
  professionCodeDelete,
  updateProfessionCode,
  professionCodeActive,
  addProfessionRegister,
  professionRegisterList,
  updateProfessionRegister,
  professionRegisterDelete
};
