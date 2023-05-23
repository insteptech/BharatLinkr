const Joi = require('joi');

// const register = {
//   body: Joi.object().keys({
//     firstName: Joi.string().label('First name').required(),
//     lastName: Joi.string().label('Last name').required(),
//     email: Joi.string().label('Email').required().email(),
//     password: Joi.string().label('password').required(),
//     confirmPassword: Joi.string().label('password').required(),
//   }),
// };

const login = {
  body: Joi.object().keys({
    email: Joi.string().label('Email').required().email(),
    password: Joi.string().label('password').required(),
  }),
};

module.exports = { login };
