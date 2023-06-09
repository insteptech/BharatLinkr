const express = require('express');
const { fileUpload } = require('../middlewares/file');

const organisationController = require('../controllers/organisationController');

const router = express.Router();

router.post('/addSector', organisationController.addSector);

router.post('/sectorList', organisationController.sectorList);
router.delete('/sectorDelete/:id', organisationController.sectorDelete);

router.post('/updateSector', organisationController.updateSector);

router.post('/addIndustry', organisationController.addIndustry);
router.post('/indusrtyList', organisationController.industryList);
router.delete('/industryDelete/:id', organisationController.industryDelete);
router.post('/updateIndustry', organisationController.updateIndustry);


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

router.post('/addOrganisationLikes', organisationController.organisationAddLikesAndViews);




// router.post(
//   '/addOrganisationPost',
//   fileUpload.fields([
//     {
//       name: 'imageFile',
//       maxCount: 10,
//     },

//   ]),
//   organisationController.addOrganisationPosts
// );

// router.post('/organisationPostList', organisationController.organisationPostList);
// router.delete('/organisationPostDelete/:id', organisationController.organisationPostDelete);



// router.post(
//   '/updateOrganisationPost',
//   fileUpload.fields([
//     {
//       name: 'imageFile',
//       maxCount: 10,
//     },
//   ]),
//   organisationController.updateOrganisationPost
// );

router.post('/addOrganisationLinksData', organisationController.addOrganisationLinksData);
router.post('/linksApproval', organisationController.organisationLinkApproval);
router.post('/organisationPendingRequestList', organisationController.organisationPendingRequestList);
router.post('/orgaissationSectorDelete', organisationController.organisationSectorDelete);
router.post('/orgaissationIndustryDelete', organisationController.organisationIndustryDelete);
router.post('/orgaissationBuisnessDelete', organisationController.organisationBusinessDelete);
router.post('/orgaissationCompanyLevelDelete', organisationController.organisationcompanyLevelDelete);

router.post('/addOrganisationCompany', organisationController.addCompany);
router.post('/updateOrganisationCompany', organisationController.updateCompany);
router.post('/companyList', organisationController.companyList);
router.delete('/companyDelete/:id', organisationController.companyDelete);

router.post('/addOrganisationGroup', organisationController.addOrganisationGroup);
router.post('/updateOrganisationGroup', organisationController.updateOrganisationGroup);
router.post('/organisationGroupList', organisationController.organisationGroupList);
router.delete('/organisationGroupDelete/:id', organisationController.organisationGroupDelete);


router.post('/addOrganisationBrand', organisationController.addOrganisationBrand,);
router.post('/updateOrganisationBrand', organisationController.updateOrganisationBrand);
router.post('/organisationBrandList', organisationController.organisationBrandList);
router.delete('/organisationBrandDelete/:id', organisationController.organisationBrandDelete);


















module.exports = router;
