const express = require('express');
const { fileUpload } = require('../middlewares/file');

const examController = require('../controllers/examController');

const router = express.Router();
router.post(
    '/addExam',
    fileUpload.fields([
      {
        name: 'imageFile',
        maxCount: 10,
      },
      {
        name: 'examLogoFile',
        maxCount: 10,
      },
    ]),
    examController.addExam
  );

router.post('/examlist', examController.examList);
router.delete('/deleteExam/:id', examController.examDelete);

router.post(
  '/updateExam',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },
    {
      name: 'examLogoFile',
      maxCount: 10,
    },
  ]),
  examController.updateExam
);

router.post('/examByStreamCourse', examController.examByStreamCourse);
router.post('/allExamList', examController.allExamList);

router.post('/examFAQDelete', examController.examFAQDelete);



module.exports = router;
