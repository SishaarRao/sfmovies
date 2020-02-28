'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  startyear: Joi.number().integer().min(1878).max(9999),
  endyear: Joi.number().integer().min(1878).max(9999).optional(),
  name: Joi.string().min(1).max(255),
  similar: Joi.boolean().optional()
});
