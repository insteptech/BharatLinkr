const express = require('express');

const router = express.Router();

router.get('/', function (err, res) {
  res.send(200);
});

module.exports = router;
