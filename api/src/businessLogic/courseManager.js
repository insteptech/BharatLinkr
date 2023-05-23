const courseDbContext = require('../dbAccess/courseDbContext');

const addCourse = async function (req) {
  let stream = null;
  const result = await courseDbContext.addCourse(req);
  if (result.success) {
    stream = result.data;
    return { data: { stream }, success: true };
  }
};



const courseList = async function (req) {
  const result = await courseDbContext.courseList(req);
  return result;
};

const courseDelete = async function (req) {
  const result = await courseDbContext.courseDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateCourse = async function (req) {
  const result = await courseDbContext.updateCourse(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const courseByStream = async function (req) {
  const result = await courseDbContext.courseByStream(req);
  return result;
};




module.exports = {
    addCourse,
    courseList,
    courseDelete,
    updateCourse,
    courseByStream
    

};
