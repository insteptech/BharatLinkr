const express = require('express');

const courseController = require('../controllers/courseController');

const router = express.Router();
router.post('/addCourse', courseController.addCourse);
router.post('/courselist', courseController.courseList);
router.delete('/courseDelete/:id', courseController.courseDelete);
router.post('/courseUpdate', courseController.updateCourse);
router.post('/courseByStream', courseController.courseByStream);







module.exports = router;
