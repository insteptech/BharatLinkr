const httpStatus = require('http-status');
const subStreamManager = require('../businessLogic/subStreamManager');

const addSubStream = async function (req, res) {
  await subStreamManager
    .addSubStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const subStreamDelete = async function (req, res) {
  await subStreamManager
    .subStreamDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const subStreamList = async function (req, res) {
  await subStreamManager
    .subStreamList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const updateSubStream = async function (req, res) {
  await subStreamManager
    .updateSubStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const streamActive = async function (req, res) {
  await subStreamManager
    .streamActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const subStreamById = async function (req, res) {
  await subStreamManager
    .subStreamById(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


module.exports = {
  addSubStream,
  subStreamDelete,
  subStreamList,
  updateSubStream,
  streamActive,
  subStreamById,
};
