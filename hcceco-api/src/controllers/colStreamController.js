const httpStatus = require('http-status');
const colStreamManager = require('../businessLogic/colStreamManager');

const addColStream = async function (req, res) {
  await colStreamManager
    .addColStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const colStreamList = async function (req, res) {
  await colStreamManager
    .colStreamList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const colStreamDelete = async function (req, res) {
  await colStreamManager
    .colStreamDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const updateColStream = async function (req, res) {
  await colStreamManager
    .updateColStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const colStreamActive = async function (req, res) {
  await colStreamManager
    .colStreamActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const colStreamById = async function (req, res) {
  await colStreamManager
    .colStreamById(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


module.exports = {
  addColStream,
  colStreamList,
  colStreamDelete,
  updateColStream,
  colStreamActive,
  colStreamById,
};
