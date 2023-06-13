const { sector,
  industry,
  sequelize,
  organisation,
  organisationLikesCount,
  State,
  City,
  organisationCMS,
  organisationSector,
  organisationNatureOfBusiness,
  organisationIndustry,
  organisationCompanyLevel,
  listOfUsersLikes,
  organisationPost,
  organisationLinksData,
  User,
  organisationCompany,
  organisationBrand,
  organisationGroup,
  masterFilter,
  mainStream,
  subStream,
  college,
  exam,
  corporateRegister,
  Status,
course } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');



const writeFiles = async ({ companyLogoFile, companyCoverFile, imageFile }) => {
  const baseDir = path.join(__dirname, '../../');

  const dir = `${baseDir}/documents/organisation`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (companyLogoFile && companyLogoFile.length > 0) {
    await Promise.all(
      companyLogoFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }
  if (companyCoverFile && companyCoverFile.length > 0) {
    await Promise.all(
      companyCoverFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }

  if (imageFile && imageFile.length > 0) {
    await Promise.all(
      imageFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }



}

const addSector = async (req) => {
  try {
    const sector1 = [];
    await Promise.all(
      req.body.sectorData.map(async (item) => {
        const sec = await sector.findOne({ where: { name: item.name, deleted: false } });
        if (!sec) {
          const result = await sector.create({ ...item, returning: true });
          sector1.push(result);
          return result;
        }
        sector1.push({ name: item.name, status: 'duplicate' });
      })
    );
    return { data: sector1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const sectorList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false }
    }
    if (req.body.search) {
      const obj = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    const result = await sector.findAndCountAll({
      where: whrCondition,

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const sectorDelete = async (req) => {
  try {
    const sectorDel = await sector.findOne({
      where: { id: req.id },
    });
    const inIndustry = await industry.findOne({
      where: {
        [Op.or]: [
          { sectorId: req.id }

        ],
        deleted: false,
      },
    });



    if (inIndustry) {
      throw new Error(`Sorry can't delete. As it is releated with
      ${inIndustry ? 'Industry,' : ''}`);
    }

    await sectorDel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateSector = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.sectorData.map(async (item) => {
        const prg = await sector.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('Sector Already exists');
        } else {
          const res = await sector.update(
            { ...item },
            {
              returning: true,
              where: { id: item.id },
            }
          );
          result.push(res)
        }
      })
    );

    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }

};

const addIndustry = async (req) => {
  try {
    const industry1 = [];
    await Promise.all(
      req.body.industryData.map(async (item) => {
        const ind = await industry.findOne({ where: { name: item.name, deleted: false } });
        if (!ind) {
          const result = await industry.create({ ...item, returning: true });
          industry1.push(result);
          return result;
        }
        industry1.push({ name: item.name, status: 'duplicate' });
      })
    );
    return { data: industry1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const industryList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false }
    }
    if (req.body.sectorId && req.body.sectorId.length > 0) {
      whrCondition = { sectorId: req.body.sectorId, deleted: false }
    }
    if (req.body.search) {
      const obj = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('industry.name')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    const result = await industry.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: sector,
          required: false,
          as: 'Sector'
        }
      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const industryDelete = async (req) => {
  try {
    const streamdel = await industry.findOne({
      where: { id: req.id },
    });


    await streamdel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateIndustry = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.industryData.map(async (item) => {
        const prg = await industry.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('Industry Already exists');
        } else {
          const res = await industry.update(
            { ...item },
            {
              returning: true,
              where: { id: item.id },
            }
          );
          result.push(res)
        }
      })
    );

    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }

};


const addOrganisation = async (req) => {
  try {
    const organisationData = JSON.parse(req.body.organisationData);

    const { companyLogoFile, companyCoverFile } = req.files;

    await writeFiles({ companyLogoFile, companyCoverFile });
    let result;

    await Promise.all(
      organisationData.payload.map(async (item) => {

        let objOrganisation = {
          orgCatgeory: item.orgCatgeory,
          groupId: item.groupId,
          brandId: item.brandId,
          companyId: item.companyId,
          typeOfCompany: item.typeOfCompany,
          companySize: item.companySize,
          establishedYear: item.establishedYear,
          webSite: item.webSite,
          competitors: item.competitors,
          headOffice: item.headOffice,
          stateId: item.stateId,
          cityId: item.cityId,
          plotNumber: item.plotNumber,
          streetAddress: item.streetAddress,
          contactNumber: item.contactNumber,
          email: item.email,
          yourRole: item.yourRole,
        }




        let brand = item.brandId
        if (typeof brand === 'string') {
          brandName = await organisationBrand.create({ brandName: brand })
          const brandid = await organisationBrand.findOne({
            where: { brandName: brand }
          })
          if (brandid.id) {
            objOrganisation.brandId = brandid.id
          }
        }

        let company = item.companyId
        if (typeof company === 'string') {
          companyName = await organisationCompany.create({ companyName: company })
          const companyid = await organisationCompany.findOne({
            where: { companyName: company }
          })
          if (companyid.id) {
            objOrganisation.companyId = companyid.id

          }
        }

        let group = item.groupId
        if (typeof group === 'string') {
          groupName = await organisationGroup.create({ groupName: group })
          const groupid = await organisationGroup.findOne({
            where: { groupName: group }
          })
          if (groupid.id) {
            objOrganisation.groupId = groupid.id

          }

        }

        if (companyLogoFile && companyLogoFile.length > 0) {
          const fileExist = companyLogoFile.find((image1) => image1.originalname);
          if (fileExist) {
            objOrganisation.companyLogo = fileExist.originalname;
          }
        }

        if (companyCoverFile && companyCoverFile.length > 0) {
          const fileExist = companyCoverFile.find((image1) => image1.originalname);
          if (fileExist) {
            objOrganisation.companyCover = fileExist.originalname;
          }
        }

        result = await organisation.create(objOrganisation, { returning: true });


        if (item.sector && item.sector.length > 0) {
          await Promise.all(item.sector.map(async (sectorData) => {
            sectorData['organisationId'] = result.id;
            await organisationSector.create(sectorData, { returning: true });
          }))
        }


        if (item.industry && item.industry.length > 0) {
          await Promise.all(item.industry.map(async (industryData) => {

            industryData['organisationId'] = result.id;
            await organisationIndustry.create(industryData, { returning: true });
          }))
        }

        if (item.businessNature && item.businessNature.length > 0) {
          await Promise.all(item.businessNature.map(async (businessData) => {

            businessData['organisationId'] = result.id;
            await organisationNatureOfBusiness.create(businessData, { returning: true });
          }))
        }

        if (item.levelOfCompany && item.levelOfCompany.length > 0) {
          await Promise.all(item.levelOfCompany.map(async (levelData) => {

            levelData['organisationId'] = result.id;
            await organisationCompanyLevel.create(levelData, { returning: true });
          }))
        }

        if (organisationData.CMS) {


          let cmdData = {

            companyAddress: organisationData.CMS.companyAddress,
            testimonials: organisationData.CMS.testimonials,
            csr: organisationData.CMS.csr,
            clients: organisationData.CMS.clients,
            awardsAndRecognisations: organisationData.CMS.awardsAndRecognisations,
            department: organisationData.CMS.department,
            cultureAndValues: organisationData.CMS.cultureAndValues,
            glance: organisationData.CMS.glance


          };

          cmdData.organisationId = result.id;
          await organisationCMS.create(cmdData, { returning: true });
        }

        return result;
      })
    );
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const organisationList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    let result;
    let companyType;
    let businessNature;
    let year;
    let state;
    let city;
    let levelComapany;
    let search;

    if (req.body.search || req.body.id || req.body.typeOfCompany || req.body.natureOfBusiness || req.body.establishedYear || req.body.stateId || req.body.cityId || req.body.companyLevel) {

      if (req.body.id) {
        whrCondition = { id: req.body.id, deleted: false }
      }
      if (req.body.search) {
        const obj = {
          brandName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('brandName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
        };
        search = { ...obj, ...whrCondition };
      }

      if (req.body.typeOfCompany && req.body.typeOfCompany.length > 0) {
        companyType = { typeOfCompany: req.body.typeOfCompany, deleted: false }
      }

      if (req.body.natureOfBusiness && req.body.natureOfBusiness.length > 0) {
        businessNature = { ['$BusinessNature.natureOfBusiness$']: req.body.natureOfBusiness, deleted: false }
      }

      if (req.body.establishedYear && req.body.establishedYear.length == 2) {
        year = { establishedYear: { [Op.between]: [req.body.establishedYear[0], req.body.establishedYear[1]] }, deleted: false }
      }

      if (req.body.stateId && req.body.stateId.length > 0) {
        state = { stateId: req.body.stateId, deleted: false }
      }

      if (req.body.cityId && req.body.cityId.length > 0) {
        city = { cityId: req.body.cityId, deleted: false }
      }

      if (req.body.companyLevel && req.body.companyLevel.length > 0) {
        levelComapany = { ['$CompanyLevel.companyLevel$']: req.body.companyLevel, deleted: false }
      }

    }

    result = await organisation.findAndCountAll({
      where: {
        [Op.and]: [whrCondition,
          companyType,
          businessNature,
          year,
          state,
          city,
          levelComapany,
          search]
      },

      subQuery: false,
      include: [
        {
          model: organisationLikesCount,
          required: false,
          as: 'LikesCount'
        },
        {
          model: organisationLinksData,
          required: false,
          where: { approval: true },
          as: 'Followers',
        },
        {
          model: organisationPost,
          required: false,
          as: 'Posts',
        },
        {

          model: organisationSector,
          required: false,
          where: { deleted: false },
          as: 'orgSector',

          include: [
            {
              model: sector,
              required: false,
              as: 'Sector'
            }
          ]

        },
        {
          model: organisationIndustry,
          required: false,
          where: { deleted: false },
          as: 'orgIndustry',
          include: [{
            model: industry,
            required: false,
            as: 'Industry'
          }]
        },
        {
          model: organisationNatureOfBusiness,
          required: false,
          where: { deleted: false },
          as: 'BusinessNature'
        },
        {
          model: organisationCompanyLevel,
          required: false,
          where: { deleted: false },
          as: 'CompanyLevel'
        },
        {
          model: organisationCompany,
          required: false,
          where: { deleted: false },
          as: 'OrganisationCompany'
        },
        {
          model: organisationBrand,
          required: false,
          where: { deleted: false },
          as: 'OrganisationBrand'
        },
        {
          model: organisationGroup,
          required: false,
          where: { deleted: false },
          as: 'OrganisationGroup'
        },

        {
          model: State,
          required: false,
          as: 'States'
        },
        {
          model: City,
          required: false,
          as: 'Cities'
        },

        {
          model: organisationCMS,
          required: false,
          as: 'OrganisationCMS'
        },


      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });

    result["rows"] = result["rows"].map((row) => {
      row = row.toJSON();
      row["FollowerCount"] = row["Followers"].length;
      row["PostCount"] = row["Posts"].length;

      return row;
    });



    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const organisationDelete = async (req) => {
  try {
    const streamdel = await organisation.findOne({
      where: { id: req.id },
    });


    await streamdel.update({ deleted: true });
    await organisationCMS.update({ deleted: true }, { where: { organisationId: req.id } });
    await organisationSector.update({ deleted: true }, { where: { organisationId: req.id } });
    await organisationIndustry.update({ deleted: true }, { where: { organisationId: req.id } });
    await organisationCompanyLevel.update({ deleted: true }, { where: { organisationId: req.id } });
    await organisationNatureOfBusiness.update({ deleted: true }, { where: { organisationId: req.id } });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const updateOrgaisation = async (req) => {
  try {
    const result = [];

    const organisationData = JSON.parse(req.body.organisationData);
    const { companyLogoFile, companyCoverFile } = req.files;

    await writeFiles(req.files);

    if (companyLogoFile && companyLogoFile.length > 0) {
      const fileExist = companyLogoFile.find(
        (file) => file.originalname
      );
      if (fileExist) {
        if (req.companyLogo)
          if (fs.existsSync(path.resolve(dir, `${req.companyLogo}`))) {
            fs.unlinkSync(path.resolve(dir, `${req.companyLogo}`));
          }

        organisationData['companyLogo'] = fileExist.originalname;
      }
    }

    if (companyCoverFile && companyCoverFile.length > 0) {
      const fileExist = companyCoverFile.find(
        (file) => file.originalname
      );
      if (fileExist) {
        if (req.companyCover)
          if (fs.existsSync(path.resolve(dir, `${req.companyCover}`))) {
            fs.unlinkSync(path.resolve(dir, `${req.companyCover}`));
          }

        organisationData['companyCover'] = fileExist.originalname;
      }
    }



    let brand = organisationData.brandId
    if (typeof brand === 'string') {
      brandName = await organisationBrand.create({ brandName: brand })
      const brandid = await organisationBrand.findOne({
        where: { brandName: brand }
      })
      if (brandid.id) {
        organisationData.brandId = brandid.id

      }
    }

    let company = organisationData.companyId
    if (typeof company === 'string') {
      companyName = await organisationCompany.create({ companyName: company })
      const companyid = await organisationCompany.findOne({
        where: { companyName: company }
      })
      if (companyid.id) {
        organisationData.companyId = companyid.id

      }
    }


    let group = organisationData.groupId
    if (typeof group === 'string') {
      groupName = await organisationGroup.create({ groupName: group })
      const groupid = await organisationGroup.findOne({
        where: { groupName: group }
      })
      if (groupid.id) {
        organisationData.groupId = groupid.id

      }
    }


    const updateData = await organisation.update(organisationData, { where: { id: organisationData.id }, returning: true })


    if (organisationData.sector && organisationData.sector.length > 0) {
      organisationData.sector.map(async (secData) => {
        if (secData.id && secData.organisationId) {
          await organisationSector.update(secData, {
            where: { id: secData.id, organisationId: secData.organisationId },
            returning: true,
          });
        } else {
          secData.organisationId = organisationData.id;
          await organisationSector.create(secData);
        }
      })

    }

    if (organisationData.industry && organisationData.industry.length > 0) {
      organisationData.industry.map(async (indData) => {
        if (indData.id && indData.organisationId) {
          await organisationIndustry.update(indData, {
            where: { id: indData.id, organisationId: indData.organisationId },
            returning: true,
          });
        } else {
          indData.organisationId = organisationData.id;
          await organisationIndustry.create(indData);
        }
      })

    }

    if (organisationData.businessNature && organisationData.businessNature.length > 0) {
      organisationData.businessNature.map(async (businessData) => {
        if (businessData.id && businessData.organisationId) {
          await organisationNatureOfBusiness.update(businessData, {
            where: { id: businessData.id, organisationId: businessData.organisationId },
            returning: true,
          });
        } else {
          businessData.organisationId = organisationData.id;
          await organisationNatureOfBusiness.create(businessData);
        }
      })

    }

    if (organisationData.levelOfCompany && organisationData.levelOfCompany.length > 0) {
      organisationData.levelOfCompany.map(async (levelData) => {
        if (levelData.id && levelData.organisationId) {
          await organisationCompanyLevel.update(levelData, {
            where: { id: levelData.id, organisationId: levelData.organisationId },
            returning: true,
          });
        } else {
          levelData.organisationId = organisationData.id;
          await organisationCompanyLevel.create(levelData);
        }
      })

    }




    if (organisationData.CMS) {
      if (organisationData.CMS.id) {
        await organisationCMS.update(organisationData.CMS, {
          where: { id: organisationData.CMS.id },
          returning: true,
        });
      } else {
        organisationData.CMS.organisationId = organisationData.id;
        await organisationCMS.create(organisationData.CMS);
      }
    }
    result.push(updateData)

    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};



const organisationAddLikesAndViews = async (req) => {
  try {
    let result;
    const likesCount = await organisationLikesCount.findOne({
      where: { organisationId: req.body.organisationId }
    })

    if (likesCount) {

      let obj = {
        organisationId: likesCount.organisationId,
        userId: req.body.userId
      }
      if (req.body.update == "likes") {
        obj["likes"] = likesCount.likes + 1;
      }
      if (req.body.update == "share") {
        obj["share"] = likesCount.share + 1;
      }

      if (req.body.update == "dislikes") {
        obj["likes"] = likesCount.likes - 1;
      }
      result = await organisationLikesCount.update(obj, { where: { id: likesCount.id } });
      const likeUser = await listOfUsersLikes.findOne({
        where: { userId: req.body.userId, categoryId: req.body.organisationId, categoryTypes: 'organisation' }
      })
      if (likeUser && !req.body.update == "sahre" || req.body.update == "dislikes") {
        await listOfUsersLikes.destroy({ where: { categoryTypes: 'organisation', userId: req.body.userId, categoryId: req.body.organisationId, } })
      } else {
        let userObj = {
          userId: req.body.userId,
          categoryId: obj.organisationId,
          categoryTypes: 'organisation'
        };
        if (req.body.update == "likes") {
          await listOfUsersLikes.create(userObj)
        }
      }
    } else {
      let obj = {
        organisationId: req.body.organisationId,
        likes: 0,
        share: 0
      }
      let userObj = {
        userId: req.body.userId,
        categoryId: obj.organisationId,
        categoryTypes: 'organisation'
      };

      if (req.body.update == "likes") {
        obj["likes"] = 1;
      }
      if (req.body.update == "share") {
        obj["share"] = 1;
      }

      result = await organisationLikesCount.create(obj);
      await listOfUsersLikes.create(userObj)

    }


    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const addOrganisationPosts = async (req) => {
  try {
    const organisationPostData = JSON.parse(req.body.organisationPostData);

    const { imageFile } = req.files;

    await writeFiles({ imageFile });
    let result;

    await Promise.all(
      organisationPostData.payload.map(async (item) => {

        let objOrganisationPost = {
          organisationId: item.organisationId,
          postTypes: item.postTypes,
          title: item.title,
          description: item.description,
          department: item.department,
          subDepartment: item.subDepartment,
          state: item.state,
          city: item.city,
          workMode: item.workMode,
          jobType: item.jobType,
          jobRole: item.jobRole,
          eligibility: item.eligibility,
          college: item.college,
          course: item.course,
          exam: item.exam,
          corporate: item.corporate,
          status: item.status,
        }




        let jR = item.jobRole
        if (typeof jR === 'string') {
          jobName = await masterFilter.create({ name: jR, types: 'jobrole', statusId: 1 })
          const jobRoleId = await masterFilter.findOne({
            where: { name: jR }
          })
          if (jobRoleId.id) {
            objOrganisationPost.jobRole = jobRoleId.id
          }
        }


        7

        if (imageFile && imageFile.length > 0) {
          const fileExist = imageFile.find((image1) => image1.originalname);
          if (fileExist) {
            objOrganisationPost.image = fileExist.originalname;
          }
        }



        result = await organisationPost.create(objOrganisationPost, { returning: true });






        return result;
      })
    );
    return { data: result, success: true };
  } catch (error) {
    console.log(error, '8989989889')
    throw new Error(error);
  }
};



const updateOrganisationPost = async (req) => {
  try {


    const organisationPostData = JSON.parse(req.body.organisationPostData);
    const { imageFile } = req.files;
    await writeFiles(req.files);

    if (imageFile && imageFile.length > 0) {
      const fileExist = imageFile.find(
        (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == organisationPostData.uniqueId
      );
      if (fileExist) {
        if (imageFile && imageFile.image)
          if (fs.existsSync(path.resolve(dir, `${imageFile.image}`))) {
            fs.unlinkSync(path.resolve(dir, `${imageFile.image}`));
          }

        organisationPostData.image = fileExist.originalname;
      }
    }

    const updateData = await organisationPost.update(organisationPostData, { where: { id: organisationPostData.id }, returning: true });



    return { data: updateData, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};



const organisationPostList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false, status:1 };
    if (req.body.search) {
      const obj = {
        title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false,status:1 }
    }

    const result = await organisationPost.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: organisation,
          required: false,
          as: 'Organisation'
        },
        {
          model: mainStream,
          required: false,
          as: 'DepartMent'
        },
        {
          model: subStream,
          required: false,
          as: 'SubDepartment'
        },
        {
          model: State,
          required: false,
          as: 'States'
        },
        {
          model: City,
          required: false,
          as: 'Cities'
        },
        {
          model: masterFilter,
          required: false,
          as: 'JobRole'
        },
        {
          model: masterFilter,
          required: false,
          as: 'Eligibility'
        },
        {
          model: college,
          required: false,
          as: 'College'
        },
        {
          model: course,
          required: false,
          as: 'Course'
        },
        {
          model: exam,
          required: false,
          as: 'Exams'
        },
        {
          model: corporateRegister,
          required: false,
          as: 'Corporate'
        },
        {
          model: Status,
          required: false,
          as: 'Status'
        },
      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};



const organisationPostDelete = async (req) => {
  try {
    const collg = await organisationPost.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const addOrganisationLinksData = async (req) => {
  try {
    const link = [];
    await Promise.all(
      req.body.linkData.map(async (item) => {
        let obj = { organisationId: item.organisationId, userId: item.userId, deleted: false }

        const prg = await organisationLinksData.findOne({
          where:
            { [Op.and]: [obj] }
        });
        if (!prg) {
          const result = await organisationLinksData.create({ ...item, returning: true });
          link.push(result);
          return result;
        }
        link.push({ userId: item.userId, status: 'already added' });
      })
    );
    return { data: link, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

// this api call on approval of links ----------------------------/////
const organisationLinkApproval = async (req) => {
  try {
    let obj = {
      organisationId: req.body.organisationId,
      userId: req.body.userId
    }
    const link = await organisationLinksData.findOne({
      where:
        { [Op.and]: [obj] }
    });
    if (link) {

      let obj2 = {
        approval: link.approval,
      }
      if (req.body.update == "approved") {
        obj2["approval"] = link.approval = true;
      }

      if (req.body.update == "reject") {
        await organisationLinksData.destroy({
          where: {
            organisationId: req.body.organisationId,
            userId: req.body.userId
          }
        });

      }
      await organisationLinksData.update(obj2, { where: { [Op.and]: [obj] } });


    }
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};



const organisationPendingRequestList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false, approval: false };

    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false, approval: false }
    }


    if (req.body.organisationId) {
      whrCondition = { organisationId: req.body.organisationId, deleted: false, approval: false }
    }

    const result = await organisationLinksData.findAndCountAll({
      where: whrCondition,
      include: [

        {
          model: User,
          required: false,
          as: 'Users',

        }

      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


//these api for indiviual delete for sector, industry, businessnature, levelCompany------//
const organisationSectorDelete = async (req) => {
  try {
    const collg = await organisationSector.findOne({
      where: { organisationId: req.body.organisationId, id: req.body.id },
    });

    await collg.update({ deleted: true }, { where: { id: collg.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const organisationIndustryDelete = async (req) => {
  try {
    const collg = await organisationIndustry.findOne({
      where: { organisationId: req.body.organisationId, id: req.body.id },
    });

    await collg.update({ deleted: true }, { where: { id: collg.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const organisationBusinessDelete = async (req) => {
  try {
    const collg = await organisationNatureOfBusiness.findOne({
      where: { organisationId: req.body.organisationId, id: req.body.id },
    });

    await collg.update({ deleted: true }, { where: { id: collg.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const organisationcompanyLevelDelete = async (req) => {
  try {
    const collg = await organisationCompanyLevel.findOne({
      where: { organisationId: req.body.organisationId, id: req.body.id },
    });

    await collg.update({ deleted: true }, { where: { id: collg.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};
//------------------------------------------------------------------------------------//


//------------------------------ organisation comapny crud----------------------------//

const addCompany = async (req) => {
  try {
    let company;
    await Promise.all(
      req.body.companyData.map(async (item) => {
        company = await organisationCompany.create(item)
      })

    )
    return { data: company, success: true };

  } catch (error) {
    throw new Error(error);
  }
}


const updateCompany = async (req) => {
  try {


    let company;
    await Promise.all(
      req.body.companyData.map(async (item) => {
        company = await organisationCompany.update(item, { where: { id: item.id }, returning: true })
      })
    )
    return { data: company, success: true }
  } catch (error) {
    throw new Error(error);
  }

}

const companyList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        companyName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('companyName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false }
    }

    const result = await organisationCompany.findAndCountAll({
      where: whrCondition,


      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const companyDelete = async (req) => {
  try {
    const collg = await organisationCompany.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true }, { where: { id: req.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};
//--------------------------------- organisation comapny crud----------------------------//


//---------------------------------organisation group crud -----------------------------//

const addOrganisationGroup = async (req) => {
  try {
    let group;
    await Promise.all(
      req.body.groupData.map(async (item) => {
        group = await organisationGroup.create(item)
      })

    )
    return { data: group, success: true };

  } catch (error) {
    throw new Error(error);
  }
}

const updateOrganisationGroup = async (req) => {
  try {


    let group;
    await Promise.all(
      req.body.groupData.map(async (item) => {
        group = await organisationGroup.update(item, { where: { id: item.id }, returning: true })
      })
    )
    return { data: group, success: true }
  } catch (error) {
    throw new Error(error);
  }

}

const organisationGroupList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        groupName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('groupName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false }
    }

    const result = await organisationGroup.findAndCountAll({
      where: whrCondition,


      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const organisationGroupDelete = async (req) => {
  try {
    const collg = await organisationGroup.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true }, { where: { id: req.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

//---------------------------------organisation group crud -----------------------------//


//---------------------------------organisation brand crud -----------------------------//

const addOrganisationBrand = async (req) => {
  try {
    let brand;
    await Promise.all(
      req.body.brandData.map(async (item) => {
        brand = await organisationBrand.create(item)
      })

    )
    return { data: brand, success: true };

  } catch (error) {
    throw new Error(error);
  }
}

const updateOrganisationBrand = async (req) => {
  try {
    let brand;
    await Promise.all(
      req.body.brandData.map(async (item) => {
        brand = await organisationBrand.update(item, { where: { id: item.id }, returning: true })
      })
    )
    return { data: brand, success: true }
  } catch (error) {
    throw new Error(error);
  }

}


const organisationBrandList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        brandName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('brandName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false }
    }

    const result = await organisationBrand.findAndCountAll({
      where: whrCondition,


      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const organisationBrandDelete = async (req) => {
  try {
    const collg = await organisationBrand.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true }, { where: { id: req.id } });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


//---------------------------------organisation brand crud -----------------------------//


module.exports = {
  addSector,
  sectorDelete,
  sectorList,
  updateSector,
  addIndustry,
  industryList,
  industryDelete,
  updateIndustry,
  addOrganisation,
  organisationList,
  organisationDelete,
  updateOrgaisation,
  organisationAddLikesAndViews,
  addOrganisationPosts,
  updateOrganisationPost,
  organisationPostList,
  organisationPostDelete,
  addOrganisationLinksData,
  organisationLinkApproval,
  organisationPendingRequestList,
  organisationSectorDelete,
  organisationIndustryDelete,
  organisationBusinessDelete,
  organisationcompanyLevelDelete,
  addCompany,
  updateCompany,
  companyList,
  companyDelete,
  addOrganisationGroup,
  updateOrganisationGroup,
  organisationGroupList,
  organisationGroupDelete,
  addOrganisationBrand,
  updateOrganisationBrand,
  organisationBrandList,
  organisationBrandDelete
};
