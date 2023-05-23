const express = require('express');

const colStreamManager = require('../controllers/colStreamController');

const router = express.Router();
router.post('/addColStream', colStreamManager.addColStream);
router.post('/colStreamList', colStreamManager.colStreamList);
router.delete('/colStreamDelete/:id', colStreamManager.colStreamDelete);
router.post('/updateColStream', colStreamManager.updateColStream);
router.post('/colstreamActive/:id', colStreamManager.colStreamActive);
router.get('/colStreamById/:id', colStreamManager.colStreamById);


module.exports = router;
