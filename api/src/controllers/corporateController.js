const httpStatus = require('http-status');
const corporateManager = require('../businessLogic/corporateManager');
const logger = require('../utils/logger');

const addCorporate = async function (req, res) {
  await corporateManager
    .addCorporate(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const corporateList = async function (req, res) {
  await corporateManager
    .corporateList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const corporateDelete = async function (req, res) {
  await corporateManager
    .corporateDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateCorporate = async function (req, res) {
  await corporateManager
    .updateCorporate(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addMockTestLikesAndViews = async function (req, res) {
  await corporateManager
    .addMockTestLikesAndViews(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


//********************************** Corporate Main Category ************************************//


const addMainCategory = async function (req, res) {
  await corporateManager
    .addMainCategory(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


const mainCategoryList = async function (req, res) {
  await corporateManager
    .mainCategoryList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateMainCategory = async function (req, res) {
  await corporateManager
    .updateMainCategory(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const mainCategoryDelete = async function (req, res) {
  await corporateManager
    .mainCategoryDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const subCategoryDelete = async function (req, res) {
  await corporateManager
    .subCategoryDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};




const addSubcategory = async function (req, res) {
  await corporateManager
    .addSubcategory(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};



const subCategoryList = async function (req, res) {
  await corporateManager
    .subCategoryList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateSubCategories = async function (req, res) {
  await corporateManager
    .updateSubCategories(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const addMockTest = async function (req, res) {
  await corporateManager
    .addMockTest(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const mockTestList = async function (req, res) {
  await corporateManager
    .mockTestList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const mockTestDelete = async function (req, res) {
  await corporateManager
    .mockTestDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateMockTest = async function (req, res) {
  await corporateManager
    .updateMockTest(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
}

const addScore = async function (req, res) {
  await corporateManager
    .addScore(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
}

const addUserAnswers = async function (req, res) {
  await corporateManager
    .addUserAnswers(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
}


const userScoreList = async function (req, res) {
  await corporateManager
    .userScoreList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const userScoreCountList = async function (req, res) {
  await corporateManager
    .userScoreCountList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const corporateAddLikesAndViews = async function (req, res) {
  await corporateManager
    .corporateAddLikesAndViews(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


const mockTestQuestionDelete = async function (req, res) {
  await corporateManager
    .mockTestQuestionDelete(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
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
