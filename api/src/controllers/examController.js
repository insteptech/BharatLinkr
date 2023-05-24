const httpStatus = require('http-status');
const examManager = require('../businessLogic/examManager');
const logger = require('../utils/logger');

const addExam = async function (req, res) {
  await examManager
    .addExam(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const examList = async function (req, res) {
  await examManager
    .examList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const examDelete = async function (req, res) {
  await examManager
    .examDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateExam = async function (req, res) {
  await examManager
    .updateExam(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const examByStreamCourse = async function (req, res) {
  await examManager
    .examByStreamCourse(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const allExamList = async function (req, res) {
  await examManager
    .allExamList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const examFAQDelete = async function (req, res) {
  await examManager
    .examFAQDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


module.exports = {
    addExam,
    examList,
    examDelete,
    updateExam,
    examByStreamCourse,
    allExamList,
    examFAQDelete
};
