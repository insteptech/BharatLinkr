const jwt = require('jsonwebtoken');
const config = require('../../config/config');
/**
 * Verifies token on a request
 *
 * @param  {string}   token
 * @param  {function} callback
 * @return {object}
 */
const verifyToken = function (token, callback) {
  return jwt.verify(
    token, // The token to be verified
    config.jwt.secret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback // Pass errors or decoded token to callback
  );
};

const generateToken = async (user, role) => {
  const token = jwt.sign(
    {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      role: role.key,
      aud: 'Hcceco',
      iss: 'Hcceco',
    },
    config.jwt.secret,
    { expiresIn: config.jwt.accessExpirationTime }
  );
  return token;
};

module.exports = {
  generateToken,
  verifyToken,
};
