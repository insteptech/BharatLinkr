const express = require('express');
const { fileUpload } = require('../middlewares/file');

const corporateController = require('../controllers/corporateController');

const router = express.Router();
router.post(
    '/addCorporate',
    fileUpload.fields([
      {
        name: 'imageFile',
        maxCount: 10,
      },
      {
        name: 'pdfFile',
        maxCount: 10,
      },
   
    ]),
    corporateController.addCorporate
  );

router.post('/corporateList', corporateController.corporateList);
router.delete('/deleteCorporate/:id', corporateController.corporateDelete);

router.post(
  '/updateCorporate',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },
    {
      name: 'pdfFile',
      maxCount: 10,
    },
    
   
  ]),
  corporateController.updateCorporate
);


router.post('/addMainCategories', corporateController.addMainCategory);
router.post('/mainCategoryList', corporateController.mainCategoryList);
router.post('/updateMainCategoryList', corporateController.updateMainCategory);
router.delete('/deleteMainCategories/:id', corporateController.mainCategoryDelete);
router.delete('/deleteSubCategories/:id', corporateController.subCategoryDelete);



router.post('/addSubCategories', corporateController.addSubcategory);
router.post('/SubCategoriesList', corporateController.subCategoryList);
router.post('/updateSubCategories', corporateController.updateSubCategories);

router.post(
  '/addMockTest',
  fileUpload.fields([
    {
      name: 'questionFile',
      maxCount: 10,
    },
    {
      name: 'answerFile',
      maxCount: 10,
    },
    {
      name: 'optionAFile',
      maxCount: 10,
    },
    {
      name: 'optionBFile',
      maxCount: 10,
    },
    {
      name: 'optionCFile',
      maxCount: 10,
    },
    {
      name: 'optionDFile',
      maxCount: 10,
    },
 
  ]),
  corporateController.addMockTest
);

router.post('/mockTestlist', corporateController.mockTestList);


router.delete('/deleteMockTest/:id', corporateController.mockTestDelete);

router.post('/updateMockTest',  fileUpload.fields([
  {
    name: 'questionFile',
    maxCount: 10,
  },
  {
    name: 'answerFile',
    maxCount: 10,
  },
  {
    name: 'optionAFile',
    maxCount: 10,
  },
  {
    name: 'optionBFile',
    maxCount: 10,
  },
  {
    name: 'optionCFile',
    maxCount: 10,
  },
  {
    name: 'optionDFile',
    maxCount: 10,
  },

]), corporateController.updateMockTest);


router.post('/addMockTestLikesCount', corporateController.addMockTestLikesAndViews);
router.post('/addScore', corporateController.addScore);

router.post('/addAnswer', corporateController.addUserAnswers);
router.post('/userScore', corporateController.userScoreList);
router.post('/userScoreCount', corporateController.userScoreCountList);

router.post('/corporateLikesCount', corporateController.corporateAddLikesAndViews);
router.delete('/mockTestQuestionDelete', corporateController.mockTestQuestionDelete);
























module.exports = router;
