const collegeDbContext = require('../dbAccess/collegeDbContext');

const addCollege = async function (req) {
  let cllg = null;
  const result = await collegeDbContext.addCollege(req);
  if (result.success) {
    cllg = result.data;
    return { data: { cllg }, success: true };
  }
};


const collegeList = async function (req) {
  const result = await collegeDbContext.collegeList(req);
  return result;
};

const collegeDelete = async function (req) {
  const result = await collegeDbContext.collegeDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateCollege = async function (req) {
  const result = await collegeDbContext.updateCollege(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const allCollegeList = async function (req) {
  const result = await collegeDbContext.allCollegeList(req);
  return result;
};

const collegeCourseList = async function (req) {
  const result = await collegeDbContext.collegeCourseList(req);
  return result;
};


const statusList = async function (req) {
  const result = await collegeDbContext.statusList(req);
  return result;
};

const addCollegePosts = async function (req) {
  let exam = null;
  const result = await collegeDbContext.addCollegePosts(req);
  if (result.success) {
    exam = result.data;
    return { data: { exam }, success: true };
  }
};


const collegeAddLikesAndViews = async function (req) {
  let cllg = null;
  const result = await collegeDbContext.collegeAddLikesAndViews(req);
  if (result.success) {
    cllg = result.data;
    return { data: { cllg }, success: true };
  }
};

const addCollegeLinksData = async function (req) {
  let cllg = null;
  const result = await collegeDbContext.addCollegeLinksData(req);
  if (result.success) {
    cllg = result.data;
    return { data: { cllg }, success: true };
  }
};

const collegeLinkApproval = async function (req) {
  let cllg = null;
  const result = await collegeDbContext.collegeLinkApproval(req);
  if (result.success) {
    cllg = result.data;
    return { data: { cllg }, success: true };
  }
};

const updateCollegePost = async function (req) {
  let cllg = null;
  const result = await collegeDbContext.updateCollegePost(req);
  if (result.success) {
    cllg = result.data;
    return { data: { cllg }, success: true };
  }
};

const collegePostList = async function (req) {
  const result = await collegeDbContext.collegePostList(req);
  return result;
};


const collegePostDelete = async function (req) {
  const result = await collegeDbContext.collegePostDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const collegePendingRequestList = async function (req) {
  const result = await collegeDbContext.collegePendingRequestList(req);
  return result;
};

const collegeAssociateCourseDelete = async function (req) {
  const result = await collegeDbContext.collegeAssociateCourseDelete(req);
  return result;
};

const collegeAgencyDelete = async function (req) {
  const result = await collegeDbContext.collegeAgencyDelete(req);
  return result;
};

const collegeStreamsDelete = async function (req) {
  const result = await collegeDbContext.collegeStreamsDelete(req);
  return result;
};

const collegeFAQDelete = async function (req) {
  const result = await collegeDbContext.collegeFAQDelete(req);
  return result;
};




module.exports = {
  addCollege,
  collegeList,
  collegeDelete,
  updateCollege,
  allCollegeList,
  collegeCourseList,
  statusList,
  collegeAddLikesAndViews,
  addCollegeLinksData,
  collegeLinkApproval,
  addCollegePosts,
  updateCollegePost,
  collegePostList,
  collegePostDelete,
  collegePendingRequestList,
  collegeAssociateCourseDelete,
  collegeAgencyDelete,
  collegeStreamsDelete,
  collegeFAQDelete
};
