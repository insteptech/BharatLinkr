const express = require('express');

const professionController = require('../controllers/professionController');

const router = express.Router();
router.post('/addfamilyCode', professionController.addFamily);
router.post('/familyCodeList', professionController.familyCodeList);
router.delete('/familyCodeDelete/:id', professionController.familyCodeDelete);
router.post('/updateFamilyCode', professionController.updateFamily);
router.post('/familyCodeActive/:id', professionController.familyCodeActive);

//----------------------- Family Code--------------///

router.post('/addProfessionCode', professionController.addProfession);
router.post('/professionCodeList', professionController.professionCodeList);
router.delete('/professionCodeDelete/:id', professionController.professionCodeDelete);
router.post('/updateProfessionCode', professionController.updateProfessionCode);
router.post('/professionCodeActive/:id', professionController.professionCodeActive);

router.post('/addProfessionRegister', professionController.addProfessionRegister);
router.post('/professionRegisterList', professionController.professionRegisterList);
router.post('/updateProfessionRegister', professionController.updateProfessionRegister);
router.delete('/deleteProfessionRegister/:id', professionController.professionRegisterDelete);






module.exports = router;
