const httpStatus = require('http-status');
const professionManager = require('../businessLogic/professionManager');

const addFamily = async function (req, res) {
  await professionManager
    .addFamily(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const familyCodeDelete = async function (req, res) {
  await professionManager
    .familyCodeDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const familyCodeList = async function (req, res) {
  await professionManager
    .familyCodeList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const updateFamily = async function (req, res) {
  await professionManager
    .updateFamily(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};
const familyCodeActive = async function (req, res) {
  await professionManager
    .familyCodeActive(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


//----------------------------------Family Code-----------------------//

const addProfession = async function (req, res) {
    await professionManager
      .addProfession(req)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
      });
  };
  
  const professionCodeDelete = async function (req, res) {
    await professionManager
      .professionCodeDelete(req.params)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      });
  };
  
  const professionCodeList = async function (req, res) {
    await professionManager
      .professionCodeList(req)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      });
  };
  const updateProfessionCode = async function (req, res) {
    await professionManager
      .updateProfessionCode(req)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      });
  };
  const professionCodeActive = async function (req, res) {
    await professionManager
      .professionCodeActive(req.params)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      });
  };
  
  const addProfessionRegister = async function (req, res) {
    await professionManager
      .addProfessionRegister(req)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
      });
  };

  const professionRegisterList = async function (req, res) {
    await professionManager
      .professionRegisterList(req)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      });
  };

  const updateProfessionRegister = async function (req, res) {
    await professionManager
      .updateProfessionRegister(req)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
      });
  };

  const professionRegisterDelete = async function (req, res) {
    await professionManager
      .professionRegisterDelete(req.params)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      });
  };


module.exports = {
    addFamily,
  familyCodeDelete,
  familyCodeList,
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
