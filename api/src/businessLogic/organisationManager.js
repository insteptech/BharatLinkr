const organisationDbContext = require('../dbAccess/organisationDbContext');

const addSector = async function (req) {
  let corp = null;
  const result = await organisationDbContext.addSector(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};


const sectorList = async function (req) {
  const result = await organisationDbContext.sectorList(req);
  return result;
};

const sectorDelete = async function (req) {
  const result = await organisationDbContext.sectorDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateSector = async function (req) {
  const result = await organisationDbContext.updateSector(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const addIndustry = async function (req) {
  let org = null;
  const result = await organisationDbContext.addIndustry(req);
  if (result.success) {
    org = result.data;
    return { data: { org }, success: true };
  }
};

const industryList = async function (req) {
  const result = await organisationDbContext.industryList(req);
  return result;
};

const industryDelete = async function (req) {
  const result = await organisationDbContext.industryDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateIndustry = async function (req) {
  const result = await organisationDbContext.updateIndustry(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const addOrganisation = async function (req) {
  let corp = null;
  const result = await organisationDbContext.addOrganisation(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};


const organisationList = async function (req) {
  const result = await organisationDbContext.organisationList(req);
  return result;
};


const organisationDelete = async function (req) {
  const result = await organisationDbContext.organisationDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateOrgaisation = async function (req) {
  const result = await organisationDbContext.updateOrgaisation(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const organisationAddLikesAndViews = async function (req) {
  let corp = null;
  const result = await organisationDbContext.organisationAddLikesAndViews(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};

const addOrganisationPosts = async function (req) {
  let org = null;
  const result = await organisationDbContext.addOrganisationPosts(req);
  if (result.success) {
    org = result.data;
    return { data: { org }, success: true };
  }
};

const organisationPostList = async function (req) {
  const result = await organisationDbContext.organisationPostList(req);
  return result;
};

const organisationPostDelete = async function (req) {
  const result = await organisationDbContext.organisationPostDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateOrganisationPost = async function (req) {
  const result = await organisationDbContext.updateOrganisationPost(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const addOrganisationLinksData = async function (req) {
  let org = null;
  const result = await organisationDbContext.addOrganisationLinksData(req);
  if (result.success) {
    org = result.data;
    return { data: { org }, success: true };
  }
};

const organisationLinkApproval = async function (req) {
  let org = null;
  const result = await organisationDbContext.organisationLinkApproval(req);
  if (result.success) {
    org = result.data;
    return { data: { org }, success: true };
  }
};

const organisationPendingRequestList = async function (req) {
  const result = await organisationDbContext.organisationPendingRequestList(req);
  return result;
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
  organisationPostList,
  organisationPostDelete,
  updateOrganisationPost,
  addOrganisationLinksData,
  organisationLinkApproval,
  organisationPendingRequestList


};
