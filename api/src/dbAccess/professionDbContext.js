const { familyCode, professionCode, professionRegister, professionCMS, course } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const addFamily = async (req) => {
    try {
        const family1 = [];
        await Promise.all(
            req.body.family.map(async (item) => {
                const prg = await familyCode.findOne({ where: { familyCode: item.familyCode, deleted: false } });
                if (!prg) {
                    const result = await familyCode.create({ ...item, returning: true });
                    family1.push(result);
                    return result;
                }
                family1.push({ familyCode: item.familyCode, status: 'duplicate' });
            })
        );
        return { data: family1, success: true };
    } catch (error) {
        throw new Error(error);
    }
};

const familyCodeList = async (req) => {
    try {
        const pageNo = req.body.pageNo ? req.body.pageNo : 1;
        const size = req.body.pageSize ? req.body.pageSize : 10;
        let whrCondition = { deleted: false };
        if (req.body.id) {
            whrCondition = { id: req.body.id, deleted: false }

        }
        if (req.body.familyCode) {
            whrCondition = { familyCode: req.body.familyCode, deleted: false }

        }
        if (req.body.search) {
            const obj = {
                familyName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('familyName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
            };
            whrCondition = { ...obj, ...whrCondition }
        }
        const result = await familyCode.findAndCountAll({
            where: whrCondition,

            offset: (pageNo - 1) * size,
            limit: size,
        });
        return { data: result, success: true };
    } catch (error) {
        throw new Error(error);
    }
};

const familyCodeDelete = async (req) => {
    try {
        const family = await familyCode.findOne({
            where: { id: req.id },
        });

        const profession = await professionCode.findOne({
            where: {
                [Op.or]: [
                    { familyId: req.id },

                ],
                deleted: false,
            },
        });

        const professionRegisters = await professionRegister.findOne({
            where: {
                [Op.or]: [
                    { familyId: req.id },

                ],
                deleted: false,
            },
        });

        if (profession || professionRegisters ) {
            throw new Error(`Sorry can't delete. As it is releated with
      ${profession ? 'profession,' : professionRegisters ? 'professionRegisters,': ''}`);
        }

        await family.update({ deleted: true });

        return { success: true };
    } catch (error) {
        throw new Error(error);
    }
};

const updateFamily = async (req) => {
    try {
        const result = [];
        await Promise.all(
            req.body.family.map(async (item) => {
                const prg = await familyCode.findOne({
                    where: {
                        familyName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('familyName')), Sequelize.fn('lower', item.familyName)),
                        deleted: false,
                    },
                });
                if (prg && prg.id !== item.id) {
                    throw new Error('familyCode Already exists');
                } else {
                    const res = await familyCode.update(
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
const familyCodeActive = async (req) => {
    try {
        const family = await familyCode.findOne({
            where: { id: req.id },
        });
        await family.update({ active: false });
        return { success: true };
    } catch (error) {
        throw new Error(error);
    }
};
// --------------------------------Family Code----------------------------------//

const addProfession = async (req) => {
    try {
        let result;
        await Promise.all(
            req.body.profession.map(async (item) => {
        
                    result = await professionCode.create({ ...item, returning: true });
                    return result;
                })
                );
        return { data: result, success: true };
    } catch (error) {
        throw new Error(error);
    }
};

const professionCodeList = async (req) => {
    try {
        const pageNo = req.body.pageNo ? req.body.pageNo : 1;
        const size = req.body.pageSize ? req.body.pageSize : 10;
        let whrCondition = { deleted: false };
        if (req.body.id) {
            whrCondition = { id: req.body.id, deleted: false }

        }
        if (req.body.professionCode) {
            whrCondition = { professionCode: req.body.professionCode, deleted: false }

        }

        if (req.body.familyId) {
            whrCondition = { familyId: req.body.familyId, deleted: false }

        }

        if (req.body.search) {
            const obj = {
                professionName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('professionName')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
            };
            whrCondition = { ...obj, ...whrCondition }
        }
        const result = await professionCode.findAndCountAll({
            where: whrCondition,
            include: [
                {
                    model: familyCode,
                    required: false,
                    as: "FamilyCode"
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

const professionCodeDelete = async (req) => {
    try {
        const streamdel = await professionCode.findOne({
            where: { id: req.id },
        });

        const professionRegisters = await professionRegister.findOne({
            where: {
                [Op.or]: [
                    { professionId: req.id },

                ],
                deleted: false,
            },
        });

        if ( professionRegisters ) {
            throw new Error(`Sorry can't delete. As it is releated with
      ${ professionRegisters ? 'professionRegisters,': ''}`);
        }

        await streamdel.update({ deleted: true });

        return { success: true };
    } catch (error) {
        throw new Error(error);
    }
};

const updateProfessionCode = async (req) => {
    try {
        const result = [];
        await Promise.all(
            req.body.profession.map(async (item) => {
                const prg = await professionCode.findOne({
                    where: {
                        professionCode: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('professionCode')), Sequelize.fn('lower', item.professionCode)),
                        deleted: false,
                    },
                });
                if (prg && prg.id !== item.id) {
                    throw new Error('professionCode Already exists');
                } else {
                    const res = await professionCode.update(
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
const professionCodeActive = async (req) => {
    try {
        const family = await professionCode.findOne({
            where: { id: req.id },
        });
        await family.update({ active: false });
        return { success: true };
    } catch (error) {
        throw new Error(error);
    }
};

//-------------------------------Profession Code-----------------------------//



// ----------------------------Profession Register--------------------------//
const addProfessionRegister = async (req) => {
    try {
        let result1 = [];
        await Promise.all(
            req.body.professionRegister.map(async (item) => {

                const result = await professionRegister.create({ ...item, returning: true });

                item.cms['professionRegisterId'] = result.id;
                await professionCMS.create(item.cms)

                result1.push(result)
            })
        );
        return { data: result1, success: true };
    } catch (error) {
        throw new Error(error);
    }
};


const professionRegisterList = async (req) => {
    try {
        const pageNo = req.body.pageNo ? req.body.pageNo : 1;
        const size = req.body.pageSize ? req.body.pageSize : 10;
        let whrCondition = { deleted: false };
        if (req.body.id) {
            whrCondition = { id: req.body.id, deleted: false }

        }
        if (req.body.professionId) {
            whrCondition = { professionId: req.body.professionId, deleted: false }

        }

        if (req.body.familyId) {
            whrCondition = { familyId: req.body.familyId, deleted: false }

        }

        if (req.body.search) {
            const obj = {
                alsoCalled: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('alsoCalled')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
            };
            whrCondition = { ...obj, ...whrCondition }
        }
        const result = await professionRegister.findAndCountAll({
            where: whrCondition,
            include: [
                {
                    model: familyCode,
                    required: false,
                    as: "FamilyCode"
                },
                {
                    model: professionCode,
                    required: false,
                    as: "ProfessionCode",
                    include:[
                        {
                            model: familyCode,
                            required: false,
                            as: "FamilyCode"
                        }
                    ]
                },
                {
                    model: course,
                    required: false,
                    as: "Courses"
                },
                {
                    model: professionCMS,
                    required: false,
                    as: "CMS"
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

const updateProfessionRegister = async (req) => {
    try {
        const result = [];
        await Promise.all(
            req.body.professionRegister.map(async (item) => {
                const prg = await professionRegister.findOne({
                    where: {
                        alsoCalled: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('alsoCalled')), Sequelize.fn('lower', item.alsoCalled)),
                        deleted: false,
                    },
                });
                if (prg && prg.id !== item.id) {
                    throw new Error('Profession Already exists');
                } else {
                    const res = await professionRegister.update(
                        { ...item },
                        {
                            returning: true,
                            where: { id: item.id },
                        }
                    );
                    await professionCMS.update(
                       { ...item.cms},{where: { professionRegisterId: item.id },}
                    )
                    result.push(res)
                }
            })
        );

        return { data: result, success: true };
    } catch (error) {
        return { data: null, message: error.message, success: false };
    }
};

const professionRegisterDelete = async (req) => {
    try {
        const reg = await professionRegister.findOne({
            where: { id: req.id },
        });



        await reg.update({ deleted: true });

        return { success: true };
    } catch (error) {
        throw new Error(error);
    }
};

// ----------------------------Profession Register--------------------------//

module.exports = {
    addFamily,
    familyCodeList,
    familyCodeDelete,
    updateFamily,
    familyCodeActive,
    addProfession,
    professionCodeList,
    professionCodeDelete,
    updateProfessionCode,
    professionCodeActive,
    addProfessionRegister,
    professionRegisterList,
    updateProfessionRegister,
    professionRegisterDelete
};
