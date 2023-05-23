const subStreamDbContext = require('../dbAccess/subStreamDbContext');

const addSubStream = async function (req) {
  let stream = null;
  const result = await subStreamDbContext.addSubStream(req);
  if (result.success) {
    stream = result.data;
    // console.log(course, '><<<><><');
    return { data: { stream }, success: true };
  }
};

const subStreamList = async function (req) {
  const result = await subStreamDbContext.subStreamList(req);
  return result;
};

const subStreamDelete = async function (req) {
  //   console.log(body, '><><><><><><><><><>');
  const result = await subStreamDbContext.subStreamDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const updateSubStream = async function (req) {
  const result = await subStreamDbContext.updateSubStream(req);
  //  console.log(body);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const subStreamActive = async function (req) {
  const result = await subStreamDbContext.subStreamActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const subStreamById = async function (req) {
  const result = await subStreamDbContext.subStreamById(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

module.exports = {
  addSubStream,
  subStreamList,
  subStreamDelete,
  updateSubStream,
  subStreamActive,
  subStreamById,
};
