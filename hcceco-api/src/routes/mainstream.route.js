const express = require('express');

const mainStreamController = require('../controllers/mainStreamController');

const router = express.Router();
router.post('/addStream', mainStreamController.addMainStream);
router.post('/streamList', mainStreamController.mainStreamList);
router.delete('/streamDelete/:id', mainStreamController.streamDelete);
router.post('/updateStream', mainStreamController.updateStream);
router.post('/streamActive/:id', mainStreamController.streamActive);
router.get('/mainStreamById/:id', mainStreamController.mainStreamById);


module.exports = router;
