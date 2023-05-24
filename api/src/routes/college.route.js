const express = require('express');
const { fileUpload } = require('../middlewares/file');

const collegeController = require('../controllers/collegeController');

const router = express.Router();
router.post(
    '/addCollege',
    fileUpload.fields([
      {
        name: 'imageFile',
        maxCount: 10,
      },
      {
        name: 'collegeLogoFile',
        maxCount: 10,
      },
      {
        name: 'collegeImageFile',
        maxCount: 10,
      },
    ]),
    collegeController.addCollege
  );

router.post('/collegeList', collegeController.collegeList);
router.delete('/deleteCollege/:id', collegeController.collegeDelete);

router.post(
  '/updateCollege',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },
    {
      name: 'collegeLogoFile',
      maxCount: 10,
    },
    {
      name: 'collegeImageFile',
      maxCount: 10,
    },
  ]),
  collegeController.updateCollege
);

router.post('/popularCollegeList', collegeController.allCollegeList);
router.post('/collegeCourseList', collegeController.collegeCourseList);
router.post('/statusList', collegeController.statusList);
router.post('/collegeLikeShareCount', collegeController.collegeAddLikesAndViews);
router.post('/addCollegeLinks', collegeController.addCollegeLinksData);
router.post('/collegeApproval', collegeController.collegeLinkApproval);


router.post(
  '/addCollegePost',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },

  ]),
  collegeController.addCollegePosts
)

router.post(
  '/updateCollegePost',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },

  ]),
  collegeController.updateCollegePost
)

router.post('/collegePostList', collegeController.collegePostList);


router.delete('/collegePostsDelete/:id', collegeController.collegePostDelete);

router.post('/collegePendingRequestList', collegeController.collegePendingRequestList);


router.delete('/collegeAssociateCourselDelete', collegeController.collegeAssociateCourseDelete);
router.delete('/collegeAgencyDelete', collegeController.collegeAgencyDelete);
router.delete('/collegeStreamDelete', collegeController.collegeStreamsDelete);
router.delete('/collegeFAQDelete', collegeController.collegeFAQDelete);







module.exports = router;
