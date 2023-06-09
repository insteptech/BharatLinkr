const httpStatus = require('http-status');

const authManager = require('../businessLogic/authManager');

const register = async function (req, res) {
  await authManager
    .register(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const login = async function (req, res) {
  await authManager
    .login(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const userDelete = async function (req, res) {
  await authManager
    .userDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const userList = async function (req, res) {
  await authManager
    .userList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const verificationOtp = async function (req, res) {
  await authManager
    .verificationOtp(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const resendOtp = async function (req, res) {
  await authManager
    .resendOtp(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const userActive = async function (req, res) {
  await authManager
    .userActive(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const userPostLikeList = async function (req, res) {
  await authManager
    .userPostLikeList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const updateUserPassword = async function (req, res) {
  await authManager
    .updateUserPassword(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const forgotUserPassword = async function (req, res) {
  await authManager
    .forgotUserPassword(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const addFriend = async function (req, res) {
  await authManager
    .addFriend(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const userPendingFriendRequest = async function (req, res) {
  await authManager
    .userPendingFriendRequest(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const approveFriendRequest = async function (req, res) {
  await authManager
    .approveFriendRequest(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const collegeRegisterPendingList = async function (req, res) {
  await authManager
    .collegeRegisterPendingList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};


const approveCollegeRegisterByAdmin = async function (req, res) {
  await authManager
    .approveCollegeRegisterByAdmin(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const userPostList = async function (req, res) {
  await authManager
    .userPostList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const addUserPosts = async function (req, res) {
  await authManager
    .addUserPosts(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
};

const userFullPostList = async function (req, res) {
  await authManager
    .userFullPostList(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};

const userPostDelete = async function (req, res) {
  await authManager
    .userPostDelete(req.params)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


const updateUserPost = async function (req, res) {
  await authManager
    .updateUserPost(req)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    });
};


module.exports = {
  register,
  login,
  userList,
  userDelete,
  verificationOtp,
  resendOtp,
  userActive,
  userPostLikeList,
  updateUserPassword,
  forgotUserPassword,
  addFriend,
  userPendingFriendRequest,
  approveFriendRequest,
  collegeRegisterPendingList,
  approveCollegeRegisterByAdmin,
  userPostList,
  addUserPosts,
  userFullPostList,
  userPostDelete,
  updateUserPost
};
