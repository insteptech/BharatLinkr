const httpStatus = require('http-status');
const jwtToken = require('../utils/auth');
const { roleRights } = require('../../config/roles');
const { User, Role } = require('../../models');
/**
 * Route authentication middleware to verify a token
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 *
 */
module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    let token = null;
    const authorization = req.headers.authorization.split(' ');
    if (authorization.length === 2) {
      const key = authorization[0];
      const val = authorization[1];
      if (/^Bearer$/i.test(key)) {
        token = val.replace(/"/g, '');
        // decode token
        if (token) {
          // verifies secret and checks exp
          jwtToken.verifyToken(token, async function (err, decoded) {
            if (err) {
              return res.json({ success: false, message: 'You are not authenticated!' });
            }
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            // if (new Date(req.decoded.exp).getTime() < new Date(req.decoded.iat).getTime()) {
            //   res.status(httpStatus.UNAUTHORIZED).send('Token is expired');
            //   return;
            // }

            let userDetail = null;
            userDetail = await User.findOne({
              where: { id: req.decoded.userId },
              include: [
                {
                  model: Role,
                  attributes: ['key', 'title'],
                },
              ],
            });

            if (userDetail) {
              const accessApis = roleRights[userDetail.Role.key];
              if (accessApis && accessApis.length > 0) {
                if (accessApis.indexOf(req.route.path) > -1) {
                  next();
                } else {
                  res.status(httpStatus.UNAUTHORIZED).send('You have no access for this api');
                }
              } else {
                res.status(httpStatus.UNAUTHORIZED).send('You have no access for this api');
              }
            } else {
              res.status(httpStatus.UNAUTHORIZED).send('Invalid Token');
            }
          });
        }
      }
    } else {
      // if there is no token
      // return an error
      res.status(httpStatus.UNAUTHORIZED).send('You are not authorized to perform this operation!');
    }
  } else {
    // if there is no token
    // return an error
    res.status(httpStatus.UNAUTHORIZED).send('You are not authorized to perform this operation!');
  }
};
