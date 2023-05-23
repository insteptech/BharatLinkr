const express = require('express');
// const validate = require('../middlewares/validate');
const { fileUpload } = require('../middlewares/file');

const countryController = require('../controllers/location.controller');
// const countryValidation = require('../validations/countryValidation');

const router = express.Router();

router.post('/createCountry', countryController.createCountry);

router.post('/countrylist', countryController.getCountry);

router.get('/countryById/:id', countryController.getCountryById);

router.delete('/countryDelete/:id', countryController.countryDelete);

router.post('/updateCountry', countryController.updateCountry);

router.post('/countryActive/:id', countryController.countryActive);

router.post('/createState', countryController.createState);

router.post('/statelist', countryController.getState);

router.get('/statedropdown/:countryId?', countryController.getStateDropDown);

router.get('/stateById/:id', countryController.getStateById);

router.delete('/stateDelete/:id', countryController.stateDelete);

router.post('/updateState', countryController.updateState);

router.post('/stateActive/:id', countryController.stateActive);

router.post('/createCity', countryController.createCity);

router.post('/citylist', countryController.getCity);

router.get('/cityById/:id', countryController.getCityById);

router.get('/citydropdown/:stateId?', countryController.getCityDropDown);

router.delete('/cityDelete/:id', countryController.cityDelete);

router.post('/updateCity', countryController.updateCity);

router.post('/cityActive/:id', countryController.cityActive);

router.post(
  '/addContentByExcelCountry',
  fileUpload.fields([
    {
      name: 'datafile',
      maxCount: 1,
    },
  ]),
  countryController.addContentByExcelCountry
);

router.post(
  '/addContentByExcelState',
  fileUpload.fields([
    {
      name: 'datafile',
      maxCount: 1,
    },
  ]),
  countryController.addContentByExcelState
);

router.post(
  '/addContentByExcelCity',
  fileUpload.fields([
    {
      name: 'datafile',
      maxCount: 1,
    },
  ]),
  countryController.addContentByExcelCity
);

router.get('/downloadCountryExcel', countryController.getCountryExcel);
router.get('/downloadStateExcel', countryController.getStateExcel);
router.get('/downloadStateSampleExcel', countryController.getStateSampleFile);

router.get('/downloadCityExcel', countryController.getCityExcel);
router.get('/downloadCitySampleExcel', countryController.getCitySampleFile);
router.get('/downloadCountrySampleExcel', countryController.getCountrySampleFile);
router.post('/citiesbyStateId', countryController.getCitesByStateId);

module.exports = router;
