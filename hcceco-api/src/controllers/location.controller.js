const httpStatus = require('http-status');

const countryManager = require('../businessLogic/locationManager');

const createCountry = async function (req, res) {
  await countryManager
    .createCountry(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const getCountry = async function (req, res) {
  await countryManager
    .getCountry(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCountryById = async function (req, res) {
  await countryManager
    .getCountryById(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const countryDelete = async function (req, res) {
  await countryManager
    .countryDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateCountry = async function (req, res) {
  await countryManager
    .updateCountry(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const countryActive = async function (req, res) {
  await countryManager
    .countryActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const createState = async function (req, res) {
  await countryManager
    .createState(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const getState = async function (req, res) {
  await countryManager
    .getState(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getStateDropDown = async function (req, res) {
  await countryManager
    .getStateDropDown(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const stateDelete = async function (req, res) {
  await countryManager
    .stateDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateState = async function (req, res) {
  await countryManager
    .updateState(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const stateActive = async function (req, res) {
  await countryManager
    .stateActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const createCity = async function (req, res) {
  await countryManager
    .createCity(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const getCity = async function (req, res) {
  await countryManager
    .getCity(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCityDropDown = async function (req, res) {
  await countryManager
    .getCityDropDown(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const cityDelete = async function (req, res) {
  await countryManager
    .cityDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateCity = async function (req, res) {
  await countryManager
    .updateCity(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const cityActive = async function (req, res) {
  await countryManager
    .cityActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getStateById = async function (req, res) {
  await countryManager
    .getStateById(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCityById = async function (req, res) {
  await countryManager
    .getCityById(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addContentByExcelCountry = async function (req, res) {
  await countryManager
    .addContentByExcelCountry(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const addContentByExcelState = async function (req, res) {
  await countryManager
    .addContentByExcelState(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addContentByExcelCity = async function (req, res) {
  await countryManager
    .addContentByExcelCity(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCountryExcel = async function (req, res) {
  await countryManager
    .getCountryExcel(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getStateExcel = async function (req, res) {
  await countryManager
    .getStateExcel(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getStateSampleFile = async function (req, res) {
  await countryManager
    .getStateSampleFile(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCityExcel = async function (req, res) {
  await countryManager
    .getCityExcel(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const getCitySampleFile = async function (req, res) {
  await countryManager
    .getCitySampleFile(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCountrySampleFile = async function (req, res) {
  await countryManager
    .getCountrySampleFile(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getCitesByStateId = async function (req, res) {
  await countryManager
    .getCitesByStateId(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
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
  createCity,
  getCity,
  getCityDropDown,
  cityDelete,
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
