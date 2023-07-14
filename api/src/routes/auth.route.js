const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const { fileUpload } = require('../middlewares/file');

const router = express.Router();

router.post(
  '/userSignup',
  fileUpload.fields([
    {
      name: 'profile',
      maxCount: 2,
    },
    {
      name: 'cover',
      maxCount: 2,
    },
  ]),
  authController.register
);
router.delete('/userDelete/:id', authController.userDelete);

router.post('/userList', authController.userList);

router.post('/login', validate(authValidation.login), authController.login);

router.post('/verifyOtp', authController.verificationOtp);

router.post('/resendOtp', authController.resendOtp);

router.post('/userActive', authController.userActive);

router.post('/userLikesList', authController.userPostLikeList);

router.post('/userPasswordUpdate', authController.updateUserPassword);
router.post('/userForgotPassword', authController.forgotUserPassword);

router.post('/addFriend', authController.addFriend);

router.post('/UserPendingFriend', authController.userPendingFriendRequest);

router.post('/approveFriendRequest', authController.approveFriendRequest);

router.post('/collegeRegisterPendingList', authController.collegeRegisterPendingList);

router.post('/approveCollegeRegisterByAdmin', authController.approveCollegeRegisterByAdmin);
router.post('/userPostList', authController.userPostList);

router.post(
  '/addUserPost',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },

  ]),
  authController.addUserPosts
);

router.post('/userFullPostList', authController.userFullPostList);
router.delete('/userPostDelete/:id', authController.userPostDelete);



router.post(
  '/updateUserPost',
  fileUpload.fields([
    {
      name: 'imageFile',
      maxCount: 10,
    },
  ]),
  authController.updateUserPost
);













module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *             example:
 *               firstName: fake
 *               lastName: name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: Ok
  
 */
