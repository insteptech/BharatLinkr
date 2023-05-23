const examDbContext = require('../dbAccess/examDbContext');

const addExam = async function (req) {
  let exam = null;
  const result = await examDbContext.addExam(req);
  if (result.success) {
    exam = result.data;
    return { data: { exam }, success: true };
  }
};


const examList = async function (req) {
  const result = await examDbContext.examList(req);
  return result;
};

const examDelete = async function (req) {
  const result = await examDbContext.examDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateExam = async function (req) {
  const result = await examDbContext.updateExam(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const examByStreamCourse = async function (req) {
  const result = await examDbContext.examByStreamCourse(req);
  return result;
};

const allExamList = async function (req) {
  const result = await examDbContext.allExamList(req);
  return result;
};

module.exports = {
  addExam,
  examList,
  examDelete,
  updateExam,
  examByStreamCourse,
  allExamList,
};
