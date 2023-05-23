const mainStreamDbContext = require('../dbAccess/mainStreamDbContext');

const addMainStream = async function (req) {
  let stream = null;
  const result = await mainStreamDbContext.addMainStream(req);
  if (result.success) {
    stream = result.data;
    // console.log(course, '><<<><><');
    return { data: { stream }, success: true };
  }
};

const mainStreamList = async function (req) {
  const result = await mainStreamDbContext.mainStreamList(req);
  return result;
};

const streamDelete = async function (req) {
  //   console.log(body, '><><><><><><><><><>');
  const result = await mainStreamDbContext.streamDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const updateStream = async function (req) {
  const result = await mainStreamDbContext.updateStream(req);
  //  console.log(body);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const streamActive = async function (req) {
  const result = await mainStreamDbContext.streamActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const mainStreamById = async function (req) {
  const result = await mainStreamDbContext.mainStreamById(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

module.exports = {
  addMainStream,
  streamDelete,
  mainStreamList,
  updateStream,
  streamActive,
  mainStreamById,
};
