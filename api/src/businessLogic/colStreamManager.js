const colStreamDbContext = require('../dbAccess/colStreamDbContext');

const addColStream = async function (req) {
  let stream = null;
  const result = await colStreamDbContext.addColStream(req);
  if (result.success) {
    stream = result.data;
    // console.log(course, '><<<><><');
    return { data: { stream }, success: true };
  }
};

const colStreamList = async function (req) {
  const result = await colStreamDbContext.colStreamList(req);
  return result;
};

const colStreamDelete = async function (req) {
  //   console.log(body, '><><><><><><><><><>');
  const result = await colStreamDbContext.colStreamDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const updateColStream = async function (req) {
  const result = await colStreamDbContext.updateColStream(req);
  //  console.log(body);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};
const colStreamActive = async function (req) {
  const result = await colStreamDbContext.colStreamActive(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const colStreamById = async function (req) {
  const result = await colStreamDbContext.colStreamById(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

module.exports = {
  addColStream,
  colStreamList,
  colStreamDelete,
  updateColStream,
  colStreamActive,
  colStreamById,
};
