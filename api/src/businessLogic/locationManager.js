const countryDbContext = require('../dbAccess/locationDbContext');

const createCountry = async function (req) {
  let country = null;
  const result = await countryDbContext.createCountry(req);
  if (result.success) {
    country = result.data;
    return { data: { country }, success: true };
  }
};

const getCountry = async function (req) {
  const result = await countryDbContext.getCountry(req);
  return result;
};

const countryDelete = async function (req) {
  const result = await countryDbContext.countryDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateCountry = async function (body) {
  const result = await countryDbContext.updateCountry(body);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return { data:result, success: true };

};

const countryActive = async function (req) {
  const result = await countryDbContext.countryActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const createState = async function (req) {
  let state = null;
  const result = await countryDbContext.createState(req);
  if (result.success) {
    state = result.data;
    return { data: { state }, success: true };
  }
};

const getState = async function (req) {
  const result = await countryDbContext.getState(req);
  return result;
};

const getStateDropDown = async function (req) {
  const result = await countryDbContext.getStateDropDown(req);
  return result;
};

const stateDelete = async function (req) {
  const result = await countryDbContext.stateDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateState = async function (body) {
  const result = await countryDbContext.updateState(body);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const stateActive = async function (req) {
  const result = await countryDbContext.stateActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const createCity = async function (req) {
  let city = null;
  const result = await countryDbContext.createCity(req);
  if (result.success) {
    city = result.data;
    return { data: { city }, success: true };
  }
};

const getCity = async function (req) {
  const result = await countryDbContext.getCity(req);
  return result;
};

const getCityDropDown = async function (req) {
  const result = await countryDbContext.getCityDropDown(req);
  return result;
};

const cityDelete = async function (req) {
  const result = await countryDbContext.cityDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateCity = async function (body) {
  const result = await countryDbContext.updateCity(body);

  if (result.success) {
    return { result, success: true };
  }
  return result;
};

const cityActive = async function (req) {
  const result = await countryDbContext.cityActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const getCountryById = async function (req) {
  const result = await countryDbContext.getCountryById(req);
  return result;
};

const getStateById = async function (req) {
  const result = await countryDbContext.getStateById(req);
  return result;
};
const getCityById = async function (req) {
  const result = await countryDbContext.getCityById(req);
  return result;
};

const addContentByExcelCountry = async function (req) {
  const result = await countryDbContext.addContentByExcelCountry(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const addContentByExcelState = async function (req) {
  const result = await countryDbContext.addContentByExcelState(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const addContentByExcelCity = async function (req) {
  const result = await countryDbContext.addContentByExcelCity(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const getCountryExcel = async function (req, res) {
  const result = await countryDbContext.getCountryExcel(req, res);
  return result;
};

const getStateExcel = async function (req, res) {
  const result = await countryDbContext.getStateExcel(req, res);
  return result;
};
const getStateSampleFile = async function (req, res) {
  const result = await countryDbContext.getStateSampleFile(req, res);
  return result;
};

const getCityExcel = async function (req, res) {
  const result = await countryDbContext.getCityExcel(req, res);
  return result;
};
const getCitySampleFile = async function (req, res) {
  const result = await countryDbContext.getCitySampleFile(req, res);
  return result;
};

const getCountrySampleFile = async function (req, res) {
  const result = await countryDbContext.getCountrySampleFile(req, res);
  return result;
};


const getCitesByStateId = async function (req) {
  const result = await countryDbContext.getCitesByStateId(req);
  return result;
};

module.exports = {
  createCountry,
  getCountry,
  countryDelete,
  updateCountry,
  countryActive,
  createState,
  getState,
  getStateDropDown,
  stateDelete,
  updateState,
  stateActive,
  cityDelete,
  createCity,
  getCity,
  getCityDropDown,
  updateCity,
  cityActive,
  getCountryById,
  getStateById,
  getCityById,
  addContentByExcelCountry,
  addContentByExcelState,
  addContentByExcelCity,
  getCountryExcel,
  getStateExcel,
  getCityExcel,
  getStateSampleFile,
  getCitySampleFile,
  getCountrySampleFile,
  getCitesByStateId,
};
