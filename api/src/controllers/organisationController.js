const httpStatus = require('http-status');
const organisationManager = require('../businessLogic/organisationManager');
const logger = require('../utils/logger');

const addSector = async function (req, res) {
  await organisationManager
    .addSector(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const sectorList = async function (req, res) {
  await organisationManager
    .sectorList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const sectorDelete = async function (req, res) {
  await organisationManager
    .sectorDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateSector = async function (req, res) {
  await organisationManager
    .updateSector(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const addIndustry = async function (req, res) {
  await organisationManager
    .addIndustry(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const industryList = async function (req, res) {
  await organisationManager
    .industryList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const industryDelete = async function (req, res) {
  await organisationManager
    .industryDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateIndustry = async function (req, res) {
  await organisationManager
    .updateIndustry(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addOrganisation = async function (req, res) {
  await organisationManager
    .addOrganisation(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


const organisationList = async function (req, res) {
  await organisationManager
    .organisationList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const organisationDelete = async function (req, res) {
  await organisationManager
    .organisationDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateOrgaisation = async function (req, res) {
  await organisationManager
    .updateOrgaisation(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationAddLikesAndViews = async function (req, res) {
  await organisationManager
    .organisationAddLikesAndViews(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


const addOrganisationPosts = async function (req, res) {
  await organisationManager
    .addOrganisationPosts(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const organisationPostList = async function (req, res) {
  await organisationManager
    .organisationPostList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationPostDelete = async function (req, res) {
  await organisationManager
    .organisationPostDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateOrganisationPost = async function (req, res) {
  await organisationManager
    .updateOrganisationPost(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const addOrganisationLinksData = async function (req, res) {
  await organisationManager
    .addOrganisationLinksData(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const organisationLinkApproval = async function (req, res) {
  await organisationManager
    .organisationLinkApproval(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


const organisationPendingRequestList = async function (req, res) {
  await organisationManager
    .organisationPendingRequestList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const organisationSectorDelete = async function (req, res) {
  await organisationManager
    .organisationSectorDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const organisationIndustryDelete = async function (req, res) {
  await organisationManager
    .organisationIndustryDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationBusinessDelete = async function (req, res) {
  await organisationManager
    .organisationBusinessDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const organisationcompanyLevelDelete = async function (req, res) {
  await organisationManager
    .organisationcompanyLevelDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

module.exports = {
  addSector,
  sectorList,
  sectorDelete,
  updateSector,
  addIndustry,
  industryList,
  industryDelete,
  updateIndustry,
  addOrganisation,
  organisationList,
  organisationDelete,
  updateOrgaisation,
  organisationAddLikesAndViews,
  addOrganisationPosts,
  updateOrganisationPost,
  organisationPostList,
  organisationPostDelete,
  addOrganisationLinksData,
  organisationLinkApproval,
  organisationPendingRequestList,
  organisationSectorDelete,
  organisationIndustryDelete,
  organisationBusinessDelete,
  organisationcompanyLevelDelete

};
