'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().min(1).max(255),
  name: Joi.string().min(1).max(255),
  release_year: Joi.number().integer().min(1878).max(9999).optional()
}).xor('title', 'name');
