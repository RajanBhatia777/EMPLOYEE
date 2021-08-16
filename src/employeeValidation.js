/* eslint-disable camelcase */
const Joi = require('joi');

const first_name = Joi.string().min(2).max(30).required();
const last_name = Joi.string().min(2).max(30).required();

const addEmployee = Joi.object({
  first_name,
  last_name,
});

module.exports = { addEmployee };
