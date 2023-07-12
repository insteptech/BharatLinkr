const express = require('express');
const { fileUpload } = require('../middlewares/file');
// const validate = require('../middlewares/validate');

const masterFilterController = require('../controllers/masterFilterController');
// const masterTypeValidation = require('../validations/masterTypeValidation');

const router = express.Router();

router.post(
  '/addMasterFilter',
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
  masterFilterController.addMasterFilter
);

router.get('/masterFilterById/:id', masterFilterController.getMasterFilterById);

router.post('/masterFilterList', masterFilterController.getMasterFilter);
router.get('/masterFilterDropDown', masterFilterController.getMasterFilterDropDown);

router.post(
  '/updateMasterFilter',
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
  masterFilterController.updateMasterFilter
);


router.delete('/masterFilterDelete/:id', masterFilterController.masterFilterDelete);
router.get('/masterFilterByCourseLevel', masterFilterController.getMasterFilterByCourseLevel);

router.get('/masterFilterSampleFileDownLoad', masterFilterController.getMasterFilterSampleFile);
router.get('/masterFilterDataFileDownLoad', masterFilterController.getMasterFilterDataExcelByType);

router.post(
  '/addMasterFilterDataExcel',
  fileUpload.fields([
    {
      name: 'datafile',
      maxCount: 10,
    },

  ]),
  masterFilterController.addMasterFilterDataByExcel
);










module.exports = router;
