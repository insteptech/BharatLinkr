const express = require('express');
const { fileUpload } = require('../middlewares/file');

const organisationController = require('../controllers/organisationController');

const router = express.Router();

router.post('/addSector', organisationController.addSector);

router.post('/sectorList', organisationController.sectorList);
router.delete('/sectorDelete/:id', organisationController.sectorDelete);

router.post( '/updateSector',  organisationController.updateSector);

router.post( '/addIndustry',  organisationController.addIndustry);
router.post( '/indusrtyList',  organisationController.industryList);
router.delete( '/industryDelete/:id',  organisationController.industryDelete);
router.post( '/updateIndustry',  organisationController.updateIndustry);


router.post(
    '/addOrganisation',
    fileUpload.fields([
      {
        name: 'companyLogoFile',
        maxCount: 10,
      },
      {
        name: 'companyCoverFile',
        maxCount: 10,
      }

   
    ]),
    organisationController.addOrganisation
  );

  router.post('/organisationList', organisationController.organisationList);
  router.delete('/organisationDelete/:id', organisationController.organisationDelete);



  router.post(
    '/updateOrganisation',
    fileUpload.fields([
      {
        name: 'companyLogoFile',
        maxCount: 10,
      },
      {
        name: 'companyCoverFile',
        maxCount: 10,
      }

   
    ]),
    organisationController.updateOrgaisation
  );

  router.post( '/addOrganisationLikes',  organisationController.organisationAddLikesAndViews);


 

  router.post(
    '/addOrganisationPost',
    fileUpload.fields([
      {
        name: 'imageFile',
        maxCount: 10,
      },
  
    ]),
    organisationController.addOrganisationPosts
  );

  router.post('/organisationPostList', organisationController.organisationPostList);
  router.delete('/organisationPostDelete/:id', organisationController.organisationPostDelete);



  router.post(
    '/updateOrganisationPost',
    fileUpload.fields([
      {
        name: 'imageFile',
        maxCount: 10,
      },
    ]),
    organisationController.updateOrganisationPost
  );

  router.post( '/addOrganisationLinksData',  organisationController.addOrganisationLinksData);
  router.post( '/linksApproval',  organisationController.organisationLinkApproval);
  router.post( '/organisationPendingRequestList',  organisationController.organisationPendingRequestList);
  router.delete( '/orgaissationSectorDelete',  organisationController.organisationSectorDelete);
  router.delete( '/orgaissationIndustryDelete',  organisationController.organisationIndustryDelete);
  router.delete( '/orgaissationBuisnessDelete',  organisationController.organisationBusinessDelete);
  router.delete( '/orgaissationCompanyLevelDelete',  organisationController.organisationcompanyLevelDelete);

















module.exports = router;
