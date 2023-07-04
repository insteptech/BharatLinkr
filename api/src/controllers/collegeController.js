const httpStatus = require('http-status');
const collegeManager = require('../businessLogic/collegeManager');
const logger = require('../utils/logger');

const addCollege = async function (req, res) {
  await collegeManager
    .addCollege(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const collegeList = async function (req, res) {
  await collegeManager
    .collegeList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const collegeDelete = async function (req, res) {
  await collegeManager
    .collegeDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateCollege = async function (req, res) {
  await collegeManager
    .updateCollege(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const allCollegeList = async function (req, res) {
  await collegeManager
    .allCollegeList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegeCourseList = async function (req, res) {
  await collegeManager
    .collegeCourseList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const statusList = async function (req, res) {
  await collegeManager
    .statusList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const addCollegePosts = async function (req, res) {
  await collegeManager
    .addCollegePosts(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const collegeAddLikesAndViews = async function (req, res) {
  await collegeManager
    .collegeAddLikesAndViews(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const addCollegeLinksData = async function (req, res) {
  await collegeManager
    .addCollegeLinksData(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const collegeLinkApproval = async function (req, res) {
  await collegeManager
    .collegeLinkApproval(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const updateCollegePost = async function (req, res) {
  await collegeManager
    .updateCollegePost(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const collegePostList = async function (req, res) {
  await collegeManager
    .collegePostList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegePostDelete = async function (req, res) {
  await collegeManager
    .collegePostDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegePendingRequestList = async function (req, res) {
  await collegeManager
    .collegePendingRequestList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const collegeAssociateCourseDelete = async function (req, res) {
  await collegeManager
    .collegeAssociateCourseDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegeAgencyDelete = async function (req, res) {
  await collegeManager
    .collegeAgencyDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegeStreamsDelete = async function (req, res) {
  await collegeManager
    .collegeStreamsDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegeFAQDelete = async function (req, res) {
  await collegeManager
    .collegeFAQDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const collegeCourseFeesDelete = async function (req, res) {
  await collegeManager
    .collegeCourseFeesDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const getCollegeSampleDataExcel = async function (req, res) {
  await collegeManager
    .getCollegeSampleDataExcel(req, res)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


module.exports = {
  addCollege,
  collegeList,
  collegeDelete,
  updateCollege,
  allCollegeList,
  collegeCourseList,
  statusList,
  addCollegePosts,
  collegeAddLikesAndViews,
  addCollegeLinksData,
  collegeLinkApproval,
  updateCollegePost,
  collegePostList,
  collegePostDelete,
  collegePendingRequestList,
  collegeAssociateCourseDelete,
  collegeAgencyDelete,
  collegeStreamsDelete,
  collegeFAQDelete,
  collegeCourseFeesDelete,
  getCollegeSampleDataExcel
};
