const httpStatus = require('http-status');
const mainStreamManager = require('../businessLogic/mainStreamManager');

const addMainStream = async function (req, res) {
  await mainStreamManager
    .addMainStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const streamDelete = async function (req, res) {
  await mainStreamManager
    .streamDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const mainStreamList = async function (req, res) {
  await mainStreamManager
    .mainStreamList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const updateStream = async function (req, res) {
  await mainStreamManager
    .updateStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const streamActive = async function (req, res) {
  await mainStreamManager
    .streamActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const mainStreamById = async function (req, res) {
  await mainStreamManager
    .mainStreamById(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


module.exports = {
    addMainStream,
  streamDelete,
  mainStreamList,
  updateStream,
  streamActive,
  mainStreamById,
};
