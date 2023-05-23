const httpStatus = require('http-status');
const courseManager = require('../businessLogic/courseManager');

const addCourse = async function (req, res) {
  await courseManager
    .addCourse(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const courseList = async function (req, res) {
  await courseManager
    .courseList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const courseDelete = async function (req, res) {
  await courseManager
    .courseDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateCourse = async function (req, res) {
  await courseManager
    .updateCourse(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const courseByStream = async function (req, res) {
  await courseManager
    .courseByStream(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};



module.exports = {
    addCourse,
    courseList,
    courseDelete,
    updateCourse,
    courseByStream,

};
