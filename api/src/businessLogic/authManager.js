const axios = require('axios');
const authDbContext = require('../dbAccess/authDbContext');
const { generateToken } = require('../utils/auth');
const { proxy } = require('../../config/config');

const register = async function (req) {
  let token = null;
  let user = null;
  const result = await authDbContext.register(req);
  if (result.success) {
    token = await generateToken(result.user, result.roleDetail);
    user = result.user;
    return { data: { token, user }, success: true };
  }
  return result;
};

const login = async function (req) {
  let token = null;
  let user = null;
  const result = await authDbContext.login(req);
  if (result.success) {
    token = await generateToken(result.user, result.roleDetail);
    user = result.user;

    return { data: { token, user, permissions: result.permissions }, success: true };
  }
  return result;
};

const saveProxyAuthToken = async function () {
  return axios
    .post(`${proxy.apiUrl}/pim/auth/token`, {
      clientId: proxy.clientId,
      clientSecret: proxy.clientSecret,
    })
    .then(async function (response) {
      if (response.data && response.data.success) {
        const result = await authDbContext.saveProxyAuthToken(response.data.data);
        return result;
      }
      return { success: false };
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

const getProxyAuthToken = async function () {
  const result = await authDbContext.getProxyAuthToken();
  return result;
};

const userList = async function (req) {
  const result = await authDbContext.userList(req);
  return result;
};

const userDelete = async function (req) {
  const result = await authDbContext.userDelete(req);

  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};


const verificationOtp = async function (req) {
  const result = await authDbContext.verificationOtp(req);
  //  console.log(body);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const resendOtp = async function (req) {
  const result = await authDbContext.resendOtp(req);
  //  console.log(body);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const userActive = async function (req) {
  const result = await authDbContext.userActive(req);
  //  console.log(body);
  if (result.success) {
    return { data: { result }, success: true };
  }
  return result;
};

const userPostLikeList = async function (req) {
  const result = await authDbContext.userPostLikeList(req);
  return result;
};


const updateUserPassword = async function (req) {
  const result = await authDbContext.updateUserPassword(req);
  return result;
};

const forgotUserPassword = async function (req) {
  const result = await authDbContext.forgotUserPassword(req);
  return result;
};

const addFriend = async function (req) {
  const result = await authDbContext.addFriend(req);
  return result;
};

const userPendingFriendRequest = async function (req) {
  const result = await authDbContext.userPendingFriendRequest(req);
  return result;
};

const approveFriendRequest = async function (req) {
  const result = await authDbContext.approveFriendRequest(req);
  return result;
};






module.exports = {
  register,
  login,
  saveProxyAuthToken,
  getProxyAuthToken,
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
  approveFriendRequest
};
