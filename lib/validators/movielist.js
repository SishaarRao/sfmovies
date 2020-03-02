'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  release_year: Joi.number().integer().min(1878).max(9999),
  start_year: Joi.number().integer().min(1878).max(9999),
  end_year: Joi.number().integer().min(1878).max(9999).optional(),
  name: Joi.string().min(1).max(255),
  similar: Joi.boolean().optional()
}).without('release_year', ['start_year', 'end_year']).without('start_year', ['release_year']).without('end_year', ['release_year'])
.min(1);
