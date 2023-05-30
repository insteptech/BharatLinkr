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

const addCompany = async function (req, res) {
  await organisationManager
    .addCompany(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateCompany = async function (req, res) {
  await organisationManager
    .updateCompany(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const companyList = async function (req, res) {
  await organisationManager
    .companyList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const companyDelete = async function (req, res) {
  await organisationManager
    .companyDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addOrganisationGroup = async function (req, res) {
  await organisationManager
    .addOrganisationGroup(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateOrganisationGroup = async function (req, res) {
  await organisationManager
    .updateOrganisationGroup(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationGroupList = async function (req, res) {
  await organisationManager
    .organisationGroupList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationGroupDelete = async function (req, res) {
  await organisationManager
    .organisationGroupDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addOrganisationBrand = async function (req, res) {
  await organisationManager
    .addOrganisationBrand(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateOrganisationBrand = async function (req, res) {
  await organisationManager
    .updateOrganisationBrand(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationBrandList = async function (req, res) {
  await organisationManager
    .organisationBrandList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const organisationBrandDelete = async function (req, res) {
  await organisationManager
    .organisationBrandDelete(req.params)
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
  organisationcompanyLevelDelete,
  addCompany,
  updateCompany,
  companyList,
  companyDelete,
  addOrganisationGroup,
  updateOrganisationGroup,
  organisationGroupList,
  organisationGroupDelete,
  addOrganisationBrand,
  updateOrganisationBrand,
  organisationBrandList,
  organisationBrandDelete

};
