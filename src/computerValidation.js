/* eslint-disable no-undef */
/* eslint-disable camelcase */

const Joi = require('joi');

computer_serial_number = Joi.string().regex(/^\d{4}-\d{4}-\d{4}$/).min(14).max(20)
  .required();
const comSchema = Joi.object({

  computer_serial_number,

});

module.exports = { comSchema };
