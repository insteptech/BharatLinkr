const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const XLSX = require('xlsx');
const excelJS = require('exceljs');
const { Op } = require('sequelize');

const { corporateRegister,
  corporateCMS,
  sequelize,
  corporateMainCategories,
  corporateSubCategories,
  mockTest,
  mockTestFAQ,
  mockTestFAQAnswer,
  mockTestLikes,
  mockTestScore,
  mockTestUserAnswer,
  corporateLikesCount,
  listOfUsersLikes
} = require('../../models');

const writeFiles = async ({ questionFile, answerFile, optionAFile, optionBFile, optionCFile, optionDFile, pdfFile }) => {
  const baseDir = path.join(__dirname, '../../');

  const dir = `${baseDir}/documents/corporate`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (pdfFile && pdfFile.length > 0) {
    await Promise.all(
      pdfFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }
  if (questionFile && questionFile.length > 0) {
    await Promise.all(
      questionFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }

  if (answerFile && answerFile.length > 0) {
    await Promise.all(
      answerFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }

  if (optionAFile && optionAFile.length > 0) {
    await Promise.all(
      optionAFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }

  if (optionBFile && optionBFile.length > 0) {
    await Promise.all(
      optionBFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }

  if (optionCFile && optionCFile.length > 0) {
    await Promise.all(
      optionCFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }

  if (optionDFile && optionDFile.length > 0) {
    await Promise.all(
      optionDFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }


};

const addCorporate = async (req) => {
  try {
    const t = await sequelize.transaction();
    const corporateData = JSON.parse(req.body.corporateData);

    const { pdfFile } = req.files;

    await writeFiles({ pdfFile });
    let result;

    await Promise.all(
      corporateData.payload.map(async (item) => {

        if (item.Corporate && item.Corporate.length > 0) {
          await Promise.all(
            item.Corporate.map(async (corp) => {
              if (pdfFile && pdfFile.length > 0) {
                const fileExist = pdfFile.find((image1) => image1.originalname);
                if (fileExist) {
                  corp.image1 = fileExist.originalname;
                }
                if (pdfFile) corp.pdf = corp.image1;
              }

              result = await corporateRegister.create(corp, { returning: true }, { transaction: t });
              return result;
            })
          );
        }
        if (item.CorporateCMS && item.CorporateCMS.length > 0) {
          await Promise.all(
            item.CorporateCMS.map(async (corpCMS) => {
              corpCMS.corporateId = result.id;
              await corporateCMS.create(corpCMS, { returning: true }, { transaction: t });
            })
          );
        }


        return result;

      })
    );
    await t.commit();
    return { data: result, success: true };
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
};

const corporateList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        topicName: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('topicName')),
          'LIKE',
          `%${req.body.search.toLowerCase()}%`
        ),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id }
    }
    let sub;
    if (req.body.subCategoryId) {
      sub = { subCategoryId: req.body.subCategoryId, deleted: false }
    }
    let main;
    if (req.body.mainCategoryId) {
      main = { mainCategoryId: req.body.mainCategoryId, deleted: false }
    }
    const result = await corporateRegister.findAndCountAll({
      where: { [Op.and]: [whrCondition, sub, main] },
      include: [
        {
          model: corporateMainCategories,
          required: false,
          as: 'MainCategory',
        },
        {
          model: corporateSubCategories,
          required: false,
          as: 'SubCategory'
        },
        {
          model: corporateCMS,
          required: false,
          as: 'CMS',
        },
        {
          model: corporateLikesCount,
          required: false,
          as: 'count',
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

const corporateDelete = async (req) => {
  try {
    const corp = await corporateRegister.findOne({
      where: { id: req.id },
    });

    await corp.update({ deleted: true });
    await corporateCMS.update(
      { deleted: true },
      {
        where: { corporateId: corp.id },
      }
    );


    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateCorporate = async (req) => {
  try {


    const corporateData = JSON.parse(req.body.corporateData);
    const { pdfFile } = req.files;
    await writeFiles(req.files);

    if (pdfFile && pdfFile.length > 0) {
      const fileExist = pdfFile.find(
        (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == corporateData.uniqueId
      );
      if (fileExist) {
        if (pdfFile && pdfFile.pdf)
          if (fs.existsSync(path.resolve(dir, `${pdfFile.pdf}`))) {
            fs.unlinkSync(path.resolve(dir, `${pdfFile.pdf}`));
          }

        corporateData.pdf = fileExist.originalname;
      }
    }

    const updateData = await corporateRegister.update(corporateData, { where: { id: corporateData.id }, returning: true });

    if (corporateData.CorporateCMS) {
      if (corporateData.CorporateCMS.id) {
        await corporateCMS.update(corporateData.CorporateCMS, {
          where: { id: corporateData.CorporateCMS.id },
          returning: true,
        });
      } else {
        corporateData.CorporateCMS.corporateId = corporateData.id;
        await corporateCMS.create(corporateData.CorporateCMS);
      }
    }

    return { data: updateData, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};


const corporateAddLikesAndViews = async (req) => {
  try {
    let result;
    const likesCount = await corporateLikesCount.findOne({
      where: { corporateId: req.body.corporateId }
    })

    if (likesCount) {
      let obj = {
        corporateId: likesCount.corporateId,
      }
      if (req.body.update == "likes") {
        obj["likes"] = likesCount.likes + 1;
      }
      if (req.body.update == "downloads") {
        obj["downloads"] = likesCount.downloads + 1;
      }
      if (req.body.update == "views") {
        obj["views"] = likesCount.views + 1;
      }

      if (req.body.update == "dislikes") {
        obj["likes"] = likesCount.likes - 1;
      }
      result = await corporateLikesCount.update(obj, { where: { id: likesCount.id } });
      const likeUser = await listOfUsersLikes.findOne({

        where: { userId: req.body.userId, categoryId: req.body.corporateId, categoryTypes: 'corporate'}
      })
      if (likeUser && !req.body.update == "downloads"||!req.body.update == "views" ||req.body.update == "dislikes" )
       
       {

        await listOfUsersLikes.destroy({
          where: {
            categoryTypes: 'corporate',
            userId: req.body.userId,
            categoryId: req.body.corporateId,
           
          }
        })
      } else {
        let userObj = {
          userId: req.body.userId,
          categoryId: obj.corporateId,
          categoryTypes: 'corporate'
        };
        if(req.body.update == "likes"){

          await listOfUsersLikes.create(userObj)
        }
      }
    } else {
      let obj = {
        corporateId: req.body.corporateId,
        likes: 0,
        downloads: 0,
        views: 0

      }

      let userObj = {
        userId: req.body.userId,
        categoryId: obj.corporateId,
        categoryTypes: 'corporate'
      };
      if (req.body.update == "likes") {
        obj["likes"] = 1;
      }
      if (req.body.update == "downloads") {
        obj["downloads"] = 1;
      }
      if (req.body.update == "views") {
        obj["views"] = 1;
      }
      result = await corporateLikesCount.create(obj);
      await listOfUsersLikes.create(userObj)
    }


    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};






//************************************ Corporate Category Api Crud ********************************************//


const addMainCategory = async (req) => {
  try {
    const Category1 = [];
    await Promise.all(
      req.body.mainCategory.map(async (item) => {
        const cat = await corporateMainCategories.findOne({ where: { mainCategory: item.mainCategory, deleted: false } });
        if (!cat) {
          const result = await corporateMainCategories.create({ ...item, returning: true });
          Category1.push(result);
          return result;
        }
        Category1.push({ mainCategory: item.mainCategory, status: 'duplicate' });
      })
    );
    return { data: Category1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const mainCategoryList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.id) {
      whrCondition = req.body.id
    }
    if (req.body.search) {
      const obj = {
        mainCategory: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mainCategory')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    const result = await corporateMainCategories.findAndCountAll({
      where: whrCondition,

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const mainCategoryDelete = async (req) => {
  try {
    const maindel = await corporateMainCategories.findOne({
      where: { id: req.id },
    });
    const inSubCat = await corporateSubCategories.findOne({
      where: {
        [Op.or]: [
          { mainCategoryId: req.id }

        ],
        deleted: false,
      },
    });

    const inCorporate = await corporateRegister.findOne({
      where: {
        [Op.or]: [
          { mainCategoryId: req.id },

        ],
        deleted: false,
      },
    });

    const inMockTest = await mockTest.findOne({
      where: {
        [Op.or]: [
          { mainCategoryId: req.id },

        ],
        deleted: false,
      },
    });

    if (inSubCat || inCorporate || inMockTest) {
      throw new Error(`Sorry can't delete. As it is releated with
      ${inSubCat ? 'SubCategory,' : inCorporate ? 'Corporate Register,' : inMockTest ? 'MockTest,' : ''}`);
    }

    await maindel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateMainCategory = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.mainCategory.map(async (item) => {
        const prg = await corporateMainCategories.findOne({
          where: {
            mainCategory: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mainCategory')), Sequelize.fn('lower', item.mainCategory)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('MainCategory Already exists');
        } else {
          const res = await corporateMainCategories.update(
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

const addSubcategory = async (req) => {
  try {
    const subCat1 = [];
    const mainCategoryId = req.body.mainCategoryId
    await Promise.all(
      req.body.subcategory.map(async (item) => {
        const prg = await corporateSubCategories.findOne({ where: { subCategory: item.subCategory, deleted: false } });
        if (!prg) {
          const result = await corporateSubCategories.create({ ...item, mainCategoryId, returning: true });
          subCat1.push(result);
          return result;
        }
        subCat1.push({ subCategory: item.subCategory, status: 'duplicate' });
      })
    );
    return { data: subCat1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const subCategoryList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.id || req.body.mainCategoryId) {
      whrCondition = req.body.id || { mainCategoryId: req.body.mainCategoryId, deleted: false }
    }
    if (req.body.search) {
      const obj = {
        subCategory: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('subCategory')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    const result = await corporateSubCategories.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: corporateMainCategories,
          required: false,
          as: 'MainCategories',

        }
      ],
      offset: (pageNo - 1) * size,
      limit: size,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const subCategoryDelete = async (req) => {
  try {
    const subCatDel = await corporateSubCategories.findOne({
      where: { id: req.id },
    });

    const inCorporate = await corporateRegister.findOne({
      where: {
        [Op.or]: [
          { subCategoryId: req.id },

        ],
        deleted: false,
      },
    });


    const inMockTest = await mockTest.findOne({
      where: {
        [Op.or]: [
          { subCategoryId: req.id },

        ],
        deleted: false,
      },
    });

    if (inCorporate || inMockTest) {
      throw new Error(`Sorry can't delete. As it is releated with
      ${inCorporate ? 'Corporate Register,' : inMockTest ? 'MockTest,' : ''}`);
    }

    await subCatDel.update({ deleted: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateSubCategories = async (req) => {
  try {
    const result = [];
    await Promise.all(
      req.body.subcategory.map(async (item) => {
        const prg = await corporateSubCategories.findOne({
          where: {
            subCategory: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('subCategory')), Sequelize.fn('lower', item.subCategory)),
            deleted: false,
          },
        });
        if (prg && prg.id !== item.id) {
          throw new Error('SubCatgeory Already exists');
        } else {
          const res = await corporateSubCategories.update(
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

//***************************************** Corporate Category ************************************ */


const addMockTest = async (req) => {
  try {
    const t = await sequelize.transaction();
    const mockTestData = JSON.parse(req.body.mockTestData);

    const { questionFile, answerFile, optionAFile, optionBFile, optionCFile, optionDFile } = req.files;

    await writeFiles(req.files);

    let result;

    await Promise.all(
      mockTestData.payload.map(async (item) => {
        if (item.MockTest && item.MockTest.length > 0) {
          await Promise.all(
            item.MockTest.map(async (test) => {


              result = await mockTest.create(test, { returning: true }, { transaction: t });
              return result;
            })
          );
        }

        if (item.MocktestQuestions && item.MocktestQuestions.length > 0) {
          await Promise.all(
            item.MocktestQuestions.map(async (mockQues) => {
              let mockQuesData = {
                mockTestId: result.id,
                question: mockQues.QuestionData.question,
                optionA: mockQues.OptionAData.optionA,
                optionB: mockQues.OptionBData.optionB,
                optionC: mockQues.OptionCData.optionC,
                optionD: mockQues.OptionDData.optionD,
                type: mockQues.type,
                level: mockQues.level
              }
              if (questionFile && questionFile.length > 0) {
                const fileExist = questionFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mockQues.QuestionData.uniqueId
                );
                if (fileExist) {

                  mockQuesData.questionImage = fileExist.originalname;
                }
              }

              if (optionAFile && optionAFile.length > 0) {
                const fileExist = optionAFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mockQues.OptionAData.uniqueId
                );
                if (fileExist) {


                  mockQuesData.optionAImage = fileExist.originalname;
                }
              }

              if (optionBFile && optionBFile.length > 0) {
                const fileExist = optionBFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mockQues.OptionBData.uniqueId
                );
                if (fileExist) {


                  mockQuesData.optionBImage = fileExist.originalname;
                }
              }


              if (optionCFile && optionCFile.length > 0) {
                const fileExist = optionCFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mockQues.OptionCData.uniqueId
                );
                if (fileExist) {


                  mockQuesData.optionCImage = fileExist.originalname;
                }
              }


              if (optionDFile && optionDFile.length > 0) {
                const fileExist = optionDFile.find(
                  (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mockQues.OptionDData.uniqueId
                );
                if (fileExist) {


                  mockQuesData.optionDImage = fileExist.originalname;
                }
              }
              question = await mockTestFAQ.create(
                mockQuesData, { level: mockQues.level },
                { returning: true }, { transaction: t });
              mockQues.questionId = question.id
              mockQues.mockTestId = result.id

              await mockTestFAQAnswer.create(mockQues, { returning: true }, { transaction: t });


            })
          );
        }
        return result;
      })
    );
    await t.commit();
    return { data: result, success: true };
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
};


const mockTestList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };

    const includes = [];

    if (req.body.id) {
      whrCondition = { id: req.body.id }
    }
    if (req.body.answer) {
      includes.push(


        {
          model: mockTestFAQAnswer,
          required: false,
          where:{deleted:false},
          as: 'Answerss',
        }

      )
    }


    if (req.body.search) {
      const obj = {
        topicName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('topicName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    let sub;
    if (req.body.subCategoryId) {
      sub = { subCategoryId: req.body.subCategoryId, deleted: false }
    }
    let main;
    if (req.body.mainCategoryId) {
      main = { mainCategoryId: req.body.mainCategoryId, deleted: false }
    }

    const result = await mockTest.findAndCountAll({
      where: { [Op.and]: [whrCondition, sub, main] },
      include: [
        {
          model: corporateMainCategories,
          required: false,
          as: 'MainCategory',
        },
        {
          model: corporateSubCategories,
          required: false,
          as: 'SubCategory'
        },
        {
          model: mockTestFAQ,
          required: false,
          where:{deleted:false},
          as: 'Questions',
          include: includes
        },


        {
          model: mockTestLikes,
          required: false,
          as: 'Likes&ViewsCount'
        },
      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const mockTestDelete = async (req) => {
  try {
    const mock = await mockTest.findOne({
      where: { id: req.id },
    });
    const mockques = await mockTestFAQ.findOne({
      where: { mockTestId: req.id }
    })

    const mockans = await mockTestFAQAnswer.findOne({
      where: { questionId: mockques.id }
    })
    await mock.update({ deleted: true });
    await mockques.update({ deleted: true });
    await mockans.update({ deleted: true });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const mockTestQuestionDelete = async (req) => {
  try {

    const mockques = await mockTestFAQ.findOne({
      where: { mockTestId: req.body.mockTestId,id:req.body.id, }
    })

    const mockans = await mockTestFAQAnswer.findOne({
      where: { questionId: mockques.id }
    })
   
    await mockques.update({ deleted: true });
    await mockans.update({ deleted: true });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const updateMockTest = async (req) => {
  try {

    const mockTestData = JSON.parse(req.body.mockTestData);
    const { questionFile, answerFile, optionAFile, optionBFile, optionCFile, optionDFile } = req.files;


    await writeFiles(req.files);

    let updateData;

    await Promise.all(mockTestData.payload.map(async (item) => {

      updateData = await mockTest.update(item, { where: { id: item.id }, returning: true })
      item.MocktestQuestions.map(async (mocktestques) => {

        let mockQuesUpdateData = {
          mockTestId: item.id,
          question: mocktestques.QuestionData.question,
          optionA: mocktestques.OptionAData.optionA,
          optionB: mocktestques.OptionBData.optionB,
          optionC: mocktestques.OptionCData.optionC,
          optionD: mocktestques.OptionDData.optionD,
          type: mocktestques.type,
          level: mocktestques.level,
          answer: mocktestques.answer


        }


        if (questionFile && questionFile.length > 0) {
          const fileExist = questionFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mocktestques.QuestionData.uniqueId
          );
          if (fileExist) {
            if (questionFile && questionFile.questionImage)
              if (fs.existsSync(path.resolve(dir, `${questionFile.questionImage}`))) {
                fs.unlinkSync(path.resolve(dir, `${questionFile.questionImage}`));
              }

            mockQuesUpdateData.questionImage = fileExist.originalname;
          }
        }

        if (optionAFile && optionAFile.length > 0) {
          const fileExist = optionAFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mocktestques.OptionAData.uniqueId
          );
          if (fileExist) {
            if (optionAFile && optionAFile.optionAImage)
              if (fs.existsSync(path.resolve(dir, `${optionAFile.optionAImage}`))) {
                fs.unlinkSync(path.resolve(dir, `${optionAFile.optionAImage}`));
              }

            mockQuesUpdateData.optionAImage = fileExist.originalname;
          }
        }

        if (optionBFile && optionBFile.length > 0) {
          const fileExist = optionBFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mocktestques.OptionBData.uniqueId
          );
          if (fileExist) {
            if (optionBFile && optionBFile.optionBImage)
              if (fs.existsSync(path.resolve(dir, `${optionBFile.optionBImage}`))) {
                fs.unlinkSync(path.resolve(dir, `${optionBFile.optionBImage}`));
              }

            mockQuesUpdateData.optionBImage = fileExist.originalname;
          }
        }


        if (optionCFile && optionCFile.length > 0) {
          const fileExist = optionCFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mocktestques.OptionCData.uniqueId
          );
          if (fileExist) {
            if (optionCFile && optionCFile.optionCImage)
              if (fs.existsSync(path.resolve(dir, `${optionCFile.optionCImage}`))) {
                fs.unlinkSync(path.resolve(dir, `${optionCFile.optionCImage}`));
              }

            mockQuesUpdateData.optionCImage = fileExist.originalname;
          }
        }

        if (optionDFile && optionDFile.length > 0) {
          const fileExist = optionDFile.find(
            (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == mocktestques.OptionDData.uniqueId
          );
          if (fileExist) {
            if (optionDFile && optionDFile.optionDImage)
              if (fs.existsSync(path.resolve(dir, `${optionDFile.optionDImage}`))) {
                fs.unlinkSync(path.resolve(dir, `${optionDFile.optionDImage}`));
              }

            mockQuesUpdateData.optionDImage = fileExist.originalname;
          }
        }

        console.log(mocktestques, '77777777777777777')


        if (mocktestques.id && mocktestques.mockTestId) {

          await mockTestFAQ.update(mockQuesUpdateData, { where: { id: mocktestques.id, mockTestId: mocktestques.mockTestId } })
          await mockTestFAQAnswer.update(mockQuesUpdateData, { where: { questionId: mocktestques.id } })

        } else {
          mocktestques.mockTestId = item.id
          ques = await mockTestFAQ.create(mockQuesUpdateData)
          mocktestques.questionId = ques.id
          await mockTestFAQAnswer.create(mocktestques)

        }

      })
    }))
    return { data: updateData, success: true };
  } catch (error) {
    console.log(error, '099999999999999999999999999999999999999990')
    return { data: null, message: error.message, success: false };
  }
};


const addMockTestLikesAndViews = async (req) => {
  try {
    let result;
    const likesCount = await mockTestLikes.findOne({
      where: { mockTestId: req.body.mockTestId }
    })

    if (likesCount) {

      let obj = {
        mockTestId: likesCount.mockTestId,
      }
      if (req.body.update == "likes") {
        obj["likes"] = likesCount.likes + 1;
      }
      if (req.body.update == "attempts") {
        obj["attempts"] = likesCount.attempts + 1;
      }
      if (req.body.update == "views") {
        obj["views"] = likesCount.views + 1;
      }

      if (req.body.update == "dislikes") {
        obj["likes"] = likesCount.likes - 1;

      }
      result = await mockTestLikes.update(obj, { where: { id: likesCount.id } });
      const likeUser = await listOfUsersLikes.findOne({
        where: { userId: req.body.userId, categoryId: req.body.mockTestId, categoryTypes: 'mocktest' }
      })
      if (likeUser && !req.body.update == "views" ||
      !req.body.update == "attempts" ||
      req.body.update == "dislikes" 
      ) {
        await listOfUsersLikes.destroy({ where: { categoryTypes: 'mocktest', userId: req.body.userId, categoryId: req.body.mockTestId, } })
      } else {
        let userObj = {
          userId: req.body.userId,
          categoryId: obj.mockTestId,
          categoryTypes: 'mocktest'
        };
        if(req.body.update == "likes"){
          
          await listOfUsersLikes.create(userObj)
        }
      }


    } else {
      let obj = {
        mockTestId: req.body.mockTestId,
        likes: 0,
        attempts: 0,
        views: 0,
      }

      let userObj = {
        userId: req.body.userId,
        categoryId: obj.mockTestId,
        categoryTypes: 'mocktest'
      };
      if (req.body.update == "likes") {
        obj["likes"] = 1;
      }
      if (req.body.update == "attempts") {
        obj["attempts"] = 1;
      }
      if (req.body.update == "views") {
        obj["views"] = 1;
      }
      result = await mockTestLikes.create(obj);
      await listOfUsersLikes.create(userObj)

    }


    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const addScore = async (req) => {
  try {

    let obj = {
      mockTestId: req.body.mockTestId,
      userId: req.body.userId,
      marksObtained: req.body.marksObtained,
      marksPercentage: req.body.marksPercentage,
      totalMarks: req.body.totalMarks
    }


    const userMarks = await mockTestScore.findOne({
      where: { userId: req.body.userId }
    })

    if (req.body.UserId && req.body.mockTestId === userMarks) {
      await mockTestScore.update(obj, { where: {} })


    }




    const marks = await mockTestScore.create(
      obj
    )


    return { data: marks, success: true };
  } catch (error) {
    throw new Error(error);
  }
};




const addUserAnswers = async (req) => {
  try {

    let attemptObj = {
      mockTestId: req.body.AnswerData[0].mockTestId,
      userId: req.body.AnswerData[0].userId,
    }
    let score = await mockTestScore.create(attemptObj)
    let correctAnswerCount = 0;

    let result;
    await Promise.all(
      req.body.AnswerData.map(async (item) => {

        let ans = await mockTestFAQAnswer.findOne({
          where: { questionId: item.questionId }
        })



        item["correct"] = ans.answer === item.answer;
        item["attemptId"] = score.id;
        if (item["correct"]) {
          correctAnswerCount++;

        }

        result = await mockTestUserAnswer.create({ ...item, returning: true });
        return result;

      })
    );

    let mt = await mockTest.findOne({ where: { id: score.mockTestId } });

    let updateData = {
      totalMarks: mt.totalMarksOfTest,
      marksObtained: correctAnswerCount * mt.questionMarks,
      marksPercentage: (correctAnswerCount * mt.questionMarks / mt.totalMarksOfTest) * 100
    };
    let updatedScore = await mockTestScore.update(updateData, { where: { id: score.id }, returning: true });

    let allData = await mockTestUserAnswer.findAll({
      where: {
        userId: result.userId,
        mockTestId: result.mockTestId,
        attemptId: result.attemptId,
      }
    });
    const correctCountDetail = allData.reduce((acc, item) => {
      const key = item.correct;

      if (!acc[key]) {
        acc[key] = { correct: key, count: 1 };
      } else {
        acc[key].count++;
      }
      return acc;
    }, {});

    const nullCountDetail = allData.reduce((acc, item) => {
      const key1 = item.answer;

      if (!acc[key1]) {
        acc[key1] = { answer: key1, count: 1 };
      } else {
        acc[key1].count++;
      }
      return acc;
    }, {});

    return { data: updatedScore, correctCountDetail, nullCountDetail, score, success: true };
  } catch (error) {

    throw new Error(error);
  }
};


const userScoreList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };

    if (req.body.id && req.body.mockTestId && req.body.userId) {
      whrCondition = { id: req.body.id, mockTestId: req.body.mockTestId, userId: req.body.userId }
    }
    if (req.body.search) {
      const obj = {
        topicName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('topicName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }



    const result = await mockTestScore.findAndCountAll({
      where: { [Op.and]: [whrCondition] },


      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};



const userScoreCountList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };

    if (req.body.attemptId && req.body.mockTestId && req.body.userId) {
      whrCondition = { attemptId: req.body.attemptId, mockTestId: req.body.mockTestId, userId: req.body.userId }
    }


    let whrCondition1;
    if (req.body.answer === null) {
      whrCondition1 = { answer: req.body.answer }
    }
    let whrCondition2;
    if (req.body.correct === false || req.body.correct) {
      whrCondition2 = { correct: req.body.correct }
    }


    const result = await mockTestUserAnswer.findAndCountAll({
      where: { [Op.and]: [whrCondition, whrCondition1, whrCondition2] },

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
      order: [['id', 'ASC']],
    });



    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};





module.exports = {
  addCorporate,
  corporateList,
  corporateDelete,
  updateCorporate,
  addMainCategory,
  mainCategoryList,
  updateMainCategory,
  addSubcategory,
  subCategoryList,
  updateSubCategories,
  updateSubCategories,
  mainCategoryDelete,
  subCategoryDelete,
  addMockTest,
  mockTestList,
  mockTestDelete,
  updateMockTest,
  addMockTestLikesAndViews,
  addScore,
  addUserAnswers,
  userScoreList,
  userScoreCountList,
  corporateAddLikesAndViews,
  mockTestQuestionDelete


};
