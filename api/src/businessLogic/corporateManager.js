const corporateDbContext = require('../dbAccess/corporateDbContext');

const addCorporate = async function (req) {
  let corp = null;
  const result = await corporateDbContext.addCorporate(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};


const corporateList = async function (req) {
  const result = await corporateDbContext.corporateList(req);
  return result;
};

const corporateDelete = async function (req) {
  const result = await corporateDbContext.corporateDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateCorporate = async function (req) {
  const result = await corporateDbContext.updateCorporate(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};



const addMockTestLikesAndViews = async function (req) {
  let corp = null;
  const result = await corporateDbContext.addMockTestLikesAndViews(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};




//************************************************* Corporate Category **************************************/


const addMainCategory = async function (req) {
  let corp = null;
  const result = await corporateDbContext.addMainCategory(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};

const mainCategoryList = async function (req) {
  const result = await corporateDbContext.mainCategoryList(req);
  return result;
};

const updateMainCategory = async function (req) {
  const result = await corporateDbContext.updateMainCategory(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const mainCategoryDelete = async function (req) {
  const result = await corporateDbContext.mainCategoryDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const subCategoryDelete = async function (req) {
  const result = await corporateDbContext.subCategoryDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const addSubcategory = async function (req) {
  let corp = null;
  const result = await corporateDbContext.addSubcategory(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
};


const subCategoryList = async function (req) {
  const result = await corporateDbContext.subCategoryList(req);
  return result;
};


const updateSubCategories = async function (req) {
  const result = await corporateDbContext.updateSubCategories(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const addMockTest = async function (req) {
  let MockTest = null;
  const result = await corporateDbContext.addMockTest(req);
  if (result.success) {
    MockTest = result.data;
    return { data: { MockTest }, success: true };
  }
};

const mockTestList = async function (req) {
  const result = await corporateDbContext.mockTestList(req);
  return result;
};


const mockTestDelete = async function (req) {
  const result = await corporateDbContext.mockTestDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const updateMockTest = async function (req) {
  const result = await corporateDbContext.updateMockTest(req);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const addScore = async function (req) {
  let MockTest = null;
  const result = await corporateDbContext.addScore(req);
  if (result.success) {
    MockTest = result.data;
    return { data: { MockTest }, success: true };
  }
};

const addUserAnswers = async function (req) {
  let MockTest = null;
  const result = await corporateDbContext.addUserAnswers(req);
  if (result.success) {
    MockTest = result.data;
    correctCountDetail = result.correctCountDetail;
    nullCountDetail = result.nullCountDetail;


    return { data: { MockTest,correctCountDetail, nullCountDetail}, success: true };
  }
};
const userScoreList = async function (req) {
  const result = await corporateDbContext.userScoreList(req);
  return result;
};

const userScoreCountList = async function (req) {
  const result = await corporateDbContext.userScoreCountList(req);
  return result;
};

const corporateAddLikesAndViews = async function (req) {
  let corp = null;
  const result = await corporateDbContext.corporateAddLikesAndViews(req);
  if (result.success) {
    corp = result.data;
    return { data: { corp }, success: true };
  }
}


const mockTestQuestionDelete = async function (req) {
  const result = await corporateDbContext.mockTestQuestionDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};




module.exports = {
  addCorporate,
  corporateList,
  corporateDelete,
  updateCorporate,
  addMainCategory,
  mainCategoryList,
  updateMainCategory,
  mainCategoryDelete,
  addSubcategory,
  subCategoryList,
  updateSubCategories,
  subCategoryDelete,
  addMockTest,
  mockTestList,
  mockTestDelete,
  updateMockTest,
  addMockTestLikesAndViews,
  addScore,
  addUserAnswers,
  userScoreList,
  userScoreCountList,
  corporateAddLikesAndViews,
  mockTestQuestionDelete
};
