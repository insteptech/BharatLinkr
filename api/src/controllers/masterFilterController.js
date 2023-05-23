const httpStatus = require('http-status');
const masterFilterManager = require('../businessLogic/masterFilterManager');
const logger = require('../utils/logger');

const addMasterFilter = async function (req, res) {
  await masterFilterManager
    .addMasterFilter(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};



const getMasterFilterById = async function (req, res) {
  await masterFilterManager
    .getMasterFilterById(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
      logger.customerLogger.log('info', 'successfully get list');
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      console.log(error,'09090909090')
      logger.customerLogger.log('error', 'Error find');
    });
};


const getMasterFilter = async function (req, res) {
  await masterFilterManager
    .getMasterFilter(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const getMasterFilterDropDown = async function (req, res) {
  await masterFilterManager
    .getMasterFilterDropDown(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateMasterFilter = async function (req, res) {
  await masterFilterManager
    .updateMasterFilter(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const masterFilterDelete = async function (req, res) {
  await masterFilterManager
    .masterFilterDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};




module.exports = {
    addMasterFilter,
    getMasterFilterById,
    getMasterFilter,
    getMasterFilterDropDown,
    updateMasterFilter,
    masterFilterDelete
   
  };