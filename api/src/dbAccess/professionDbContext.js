const { familyCode, professionCode } = require('../../models');
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

        if (profession) {
            throw new Error(`Sorry can't delete. As it is releated with
      ${profession ? 'profession,' : ''}`);
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
        const profession1 = [];
        await Promise.all(
            req.body.profession.map(async (item) => {
                const prg = await professionCode.findOne({ where: { professionCode: item.professionCode, deleted: false } });
                if (!prg) {
                    const result = await professionCode.create({ ...item, returning: true });
                    profession1.push(result);
                    return result;
                }
                profession1.push({ professionCode: item.professionCode, status: 'duplicate' });
            })
        );
        return { data: profession1, success: true };
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
            include:[
                {
                    model:familyCode,
                    required: false,
                    as:"FamilyCode"
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
    professionCodeActive
};
