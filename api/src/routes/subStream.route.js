const express = require('express');

const subStreamController = require('../controllers/subStreamController');

const router = express.Router();
router.post('/addSubStream', subStreamController.addSubStream);
router.post('/subStreamList', subStreamController.subStreamList);
router.delete('/subStreamDelete/:id', subStreamController.subStreamDelete);
router.post('/updateSubStream', subStreamController.updateSubStream);
router.post('/substreamActive/:id', subStreamController.streamActive);
router.get('/subStreamById/:id', subStreamController.subStreamById);


module.exports = router;
