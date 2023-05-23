/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
const Sequelize = require('sequelize');
const XLSX = require('xlsx');
const excelJS = require('exceljs');
const { Op } = require('sequelize');

// const xl = require('excel4node');

// const ws = wb.addWorksheet('Sheet 1');

const { Countries, State, City, School, College } = require('../../models');

const createCountry = async (req) => {
  try {
    const country1 = [];
    await Promise.all(
      req.body.countryInputs.map(async (item) => {
        const prg = await Countries.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)),
            deleted: false,
          },
        });
        if (!prg) {
          const result = await Countries.create({ ...item, returning: true });
          country1.push(result);
          return result;
        }
        country1.push({ name: item.name, status: 'duplicate' });
      })
    );
    return { data: country1, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const getCountry = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    const result = await Countries.findAndCountAll({
      where: whrCondition,
      offset: (pageNo - 1) * size,
      limit: size,
    });
    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const countryDelete = async (req) => {
  try {
    const countrydel = await Countries.findOne({
      where: { id: req.id },
    });
    await countrydel.destroy({ });
    return { success: true };
  } catch (error) {
    // console.log(error,'errorerror')
    return { data: null, message: error.message, success: false };
  }
};

const updateCountry = async (body) => {
  try {
    // const result = [];
    await Promise.all(
      body.countryInputs.map(async (item) => {
        const prg = await Countries.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)),
            deleted: false,
          },
        });

        if (prg && prg.id !== item.id) {
          throw new Error('Country Already exists');
        } else {
         await Countries.update(
            { ...item },
            {
              
              where: { id: item.id }, returning: true,
            }
          );
        }
      })
    );

    return { success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const countryActive = async (req) => {
  try {
    const status1 = await Countries.findOne({
      where: { id: req.id },
    });
    await status1.update({ active: false });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const createState = async (req) => {
  try {
    const state1 = [];
    await Promise.all(
      req.body.state.map(async (item) => {
        const prg = await State.findOne({
          where: {
            state: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('state')), Sequelize.fn('LOWER', item.state)),
            countryId: item.countryId,
            deleted: false,
          },
        });
        if (!prg) {
          const result = await State.create({ ...item, returning: true });
          state1.push(result);
          return result;
        }
        state1.push({ state: item.state, status: 'duplicate' });
      })
    );
    return { data: state1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getState = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        state: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('state')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...whrCondition, ...obj };
    }

    const result = await State.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: Countries,
          required: false,
          as: 'Countries',
          attributes: ['id', 'name'],
        },
      ],
      offset: (pageNo - 1) * size,
      limit: size,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getStateDropDown = async (req) => {
  try {
    let whereCond = {};
    if (req.countryId) {
      whereCond = {
        where: { countryId: req.countryId, deleted: false },

        include: [
          {
            model: Countries,
            required: false,
            as: 'Countries',
            attributes: ['id', 'name'],
          },
        ],
      };
    } else {
      whereCond = {
        include: [
          {
            model: Countries,
            required: false,
            as: 'Countries',
            attributes: ['id', 'name'],
          },
        ],
      };
    }

    const result = await State.findAll(whereCond);
    return { result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const stateDelete = async (req) => {
  try {
    const statedel = await State.findOne({
      where: { id: req.id },
    });
 
    await statedel.update({ deleted: true });
    return { success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const updateState = async (body) => {
  try {
    const result = [];
    await Promise.all(
      body.state.map(async (item) => {
        const prg = await State.findOne({
          where: {
            state: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('state')), Sequelize.fn('lower', item.state)),
            deleted: false,
          },
        });

        if (prg && prg.id !== item.id) {
          throw new Error('State Already exists');
        } else {
          await State.update(
            { ...item },
            {
              returning: true,
              where: { id: item.id },
            }
          );
        }
      })
    );

    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const stateActive = async (req) => {
  try {
    const state1 = await Countries.findOne({
      where: { id: req.id },
    });
    await state1.update({ active: false });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const createCity = async (req) => {
  try {
    const city1 = [];
    await Promise.all(
      req.body.city.map(async (item) => {
        const prg = await City.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('LOWER', item.name)),
            stateId: item.stateId,
            deleted: false,
          },
        });

        if (!prg) {
          const result = await City.create({ ...item, returning: true });
          city1.push(result);
          return result;
        }
        city1.push({ name: item.name, status: 'duplicate' });
      })
    );
    return { data: city1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};
const getCity = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false };
    if (req.body.search) {
      const obj = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }

    const result = await City.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: State,
          required: false,
          as: 'State',
          attributes: ['id', 'state'],
        },
      ],
      offset: (pageNo - 1) * size,
      limit: size,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getCityDropDown = async (req) => {
  try {
    let whereCond = {};
    if (req.stateId) {
      whereCond = {
        where: { stateId: req.stateId },
        include: [
          {
            model: State,
            required: false,
            as: 'State',
            attributes: ['id', 'state'],
          },
        ],
      };
    } else {
      whereCond = {
        include: [
          {
            model: State,
            required: false,
            as: 'State',
            attributes: ['id', 'state'],
          },
        ],
      };
    }

    const result = await City.findAll(whereCond);
    return { result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const cityDelete = async (req) => {
  try {
    const citydel = await City.findOne({
      where: { id: req.id },
    });
    await citydel.update({ deleted: true });
    return { success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const updateCity = async (body) => {
  try {
    const result = [];
    await Promise.all(
      body.city.map(async (item) => {
        const prg = await City.findOne({
          where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.name)),
            deleted: false,
          },
        });

        if (prg && prg.id !== item.id) {
          throw new Error('City Already exists');
        } else {
          await City.update(
            { ...item },
            {
              returning: true,
              where: { id: item.id },
            }
          );
        }
      })
    );

    return { data: result, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};

const cityActive = async (req) => {
  try {
    const city1 = await Countries.findOne({
      where: { id: req.id },
    });
    await city1.update({ active: false });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getCountryById = async (req) => {
  try {
    let whereCond = {};
    if (req.id) {
      whereCond = {
        where: { id: req.id },
      };
    }

    const result = await Countries.findOne(whereCond);
    return { result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getStateById = async (req) => {
  try {
    const result = await State.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Countries,
          required: false,
          as: 'Countries',
          attributes: ['id', 'name'],
        },
      ],
    });
    return { result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getCityById = async (req) => {
  try {
    const result = await City.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: State,
          required: false,
          as: 'State',
          attributes: ['id', 'state'],
          include: [
            {
              model: Countries,
              required: false,
              as: 'Countries',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return { result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const addContentByExcelCountry = async (req) => {
  try {
    // const status = JSON.parse(req.body.statusId);
    const data1 = [];

    const { files } = req;
    // console.log(files, 'filefile');
    if (files && files.datafile && files.datafile.length > 0) {
      const file = files.datafile[0];
      const workbook = XLSX.read(file.buffer, {
        type: 'buffer',
      });

      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      await Promise.all(
        data.map(async (item) => {
          const country = await Countries.findOne({
            where: {
              name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.CountryName)),
              deleted: false,
            },
          });
          if (!country) {
            const result = await Countries.create({
              name: item.CountryName,
              returning: true,
            });
            return result;
          }
          data1.push({ name: item.CountryName, status: 'duplicate' });
        })
      );
    }

    return { data: data1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getCountryExcel = async (req, res) => {
  try {
    const countryData = await Countries.findAll({
      where: { deleted: false },
    });
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('CountryData');
    workSheet.columns = [
      { header: 'S.no', key: 's_no', width: 20 },
      { header: 'Countries', key: 'name', width: 20 },
    ];

    let count = 1;
    countryData.forEach((country) => {
      country.s_no = count;

      workSheet.addRow(country);
      count += 1;
    });
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `Countries${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const addContentByExcelState = async (req) => {
  try {
    // const status = JSON.parse(req.body.statusId);
    const data1 = [];

    const { files } = req;
    // console.log(files, 'filefile');
    let success = true;
    if (files && files.datafile && files.datafile.length > 0) {
      const file = files.datafile[0];
      const workbook = XLSX.read(file.buffer, {
        type: 'buffer',
      });

      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      // console.log(data, '090909090909090');

      await Promise.all(
        data.map(async (item) => {
          const countries1 = await Countries.findOne({
            where: {
              name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', item.CountriesName)),
            },
          });

          const stateName = item.States.split(',');

          if (countries1) {
            await Promise.all(
              stateName.map(async (state) => {
                const states1 = await State.findOne({
                  where: {
                    state: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('state')), Sequelize.fn('lower', state)),
                    deleted: false,
                  },
                });

                const saveData = {
                  state,
                  countryId: countries1.id,
                  deleted: false,
                };

                if (!states1) {
                  const result = await State.create({
                    ...saveData,
                    returning: true,
                  });
                  return result;
                }
                data1.push({ state, status: 'duplicate' });
              })
            );
          } else {
            success = false;
          }
        })
      );
    }

    return { data: data1, success };
  } catch (error) {
    throw new Error(error);
  }
};

const getStateExcel = async (req, res) => {
  try {
    const stateData = await State.findAll({
      where: { deleted: false },
      include: [
        {
          model: Countries,
          required: false,
          as: 'Countries',
          attributes: ['name'],
        },
      ],
    });
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('StateData');
    workSheet.columns = [
      { header: 'S.no', key: 's_no', width: 20 },
      { header: 'States', key: 'state', width: 20 },
      { header: 'Countries', key: 'Countries', width: 20 },
    ];

    let count = 1;
    stateData.forEach((state) => {
      state.s_no = count;
      state.Countries = state.Countries.name;

      workSheet.addRow(state);
      count += 1;
    });
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `States${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const addContentByExcelCity = async (req) => {
  try {
    // const status = JSON.parse(req.body.statusId);
    const data1 = [];

    const { files } = req;
    // console.log(files, 'filefile');
    let success = true;
    if (files && files.datafile && files.datafile.length > 0) {
      const file = files.datafile[0];
      const workbook = XLSX.read(file.buffer, {
        type: 'buffer',
      });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      // console.log(data, '090909090909090');

      await Promise.all(
        data.map(async (item) => {
          const state1 = await State.findOne({
            where: {
              state: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('state')), Sequelize.fn('lower', item.States)),
            },
          });
          // console.log(state1,'87878787878787878')
          const cityName = item.CityName.split(',');
          // console.log(cityName,'0909090909090')
          if (state1) {
            await Promise.all(
              cityName.map(async (name) => {
                const city1 = await City.findOne({
                  where: {
                    name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), Sequelize.fn('lower', name)),
                    deleted: false,
                  },
                });

                const saveData = {
                  name,
                  stateId: state1.id,
                  deleted: false,
                };
                // console.log(saveData,'09090909090')
                if (!city1) {
                  const result = await City.create({
                    ...saveData,
                    returning: true,
                  });
                  return result;
                }

                data1.push({ name, status: 'duplicate' });
              })
            );
          } else {
            success = false;
          }
        })
      );
    }

    return { data: data1, success };
  } catch (error) {
    throw new Error(error);
  }
};

const getCityExcel = async (req, res) => {
  try {
    const cityData = await City.findAll({
      where: { deleted: false },
      include: [
        {
          model: State,
          required: false,
          as: 'State',
          attributes: ['state'],
        },
      ],
    });
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('CityData');
    workSheet.columns = [
      { header: 'S.no', key: 's_no', width: 20 },
      { header: 'Cities', key: 'name', width: 20 },
      { header: 'States', key: 'States', width: 20 },
    ];

    let count = 1;
    cityData.forEach((city) => {
      city.s_no = count;
      city.States = city.State.state;

      workSheet.addRow(city);
      count += 1;
    });
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `Cities${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getStateSampleFile = async (req, res) => {
  try {
    const countryData = await Countries.findAll({
      where: { deleted: false },
    });
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('StateData');
    workSheet.columns = [
      { header: 'Countries', key: 'Countries', width: 20 },
      { header: 'States', key: 'state', width: 20 },
    ];

    countryData.forEach((country) => {
      country.Countries = country.name;
    });

    const countryNames = await Promise.all(
      countryData.map((country) => {
        return country.name;
      })
    );
    workSheet.getCell('A2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${countryNames.join(',')}"`],
    };
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `States${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    await workbook.xlsx.writeFile('statesampledata.xlsx');
    // res.send('done');
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getCitySampleFile = async (req, res) => {
  try {
    const stateData = await State.findAll({
      where: { deleted: false },
    });
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('CityData');
    workSheet.columns = [
      { header: 'States', key: 'States', width: 20 },
      { header: 'Cities', key: 'Cities', width: 20 },
    ];

    stateData.forEach((stnames) => {
      stnames.State = stnames.state;
    });

    const stateNames = await Promise.all(
      stateData.map((stnames) => {
        return stnames.state;
      })
    );
    workSheet.getCell('A2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${stateNames.join(',')}"`],
    };
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `Cities${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    await workbook.xlsx.writeFile('citysampledata.xlsx');
    // res.send('done');
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getCountrySampleFile = async (req, res) => {
  try {
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('MasterTypeData');
    workSheet.columns = [{ header: 'CountryName', key: 'CountryName', width: 20 }];

    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const filename = `Countries${Date.now()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getCitesByStateId = async (req) => {
  try {
    let state = {};
    if (req.body.stateId) {
      state = {
        id: req.body.stateId,
      };
    }
    const result = await State.findAll({
      where: { [Op.and]: [state] },
      attributes: ['state', 'id'],
      include: [
        {
          model: City,
          required: false,
          as: 'city',
          attributes: ['name', 'id'],
        },
      ],
    });
    return { result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createCountry,
  getCountry,
  countryDelete,
  updateCountry,
  countryActive,
  createState,
  getState,
  getStateDropDown,
  stateDelete,
  updateState,
  stateActive,
  createCity,
  getCity,
  getCityDropDown,
  cityDelete,
  updateCity,
  cityActive,
  getCountryById,
  getStateById,
  getCityById,
  addContentByExcelCountry,
  getCountryExcel,
  addContentByExcelState,
  addContentByExcelCity,
  getStateExcel,
  getCityExcel,
  getStateSampleFile,
  getCitySampleFile,
  getCountrySampleFile,
  getCitesByStateId,
};
