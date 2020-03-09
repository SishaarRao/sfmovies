'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  location: Joi.string().min(1).max(255).required()
});
