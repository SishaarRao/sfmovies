'use strict';

const Joi = require('joi');

const MovieAddLocationValidator = require('../../lib/validators/movielocation');

describe('movie location validator', () => {

  describe('location', () => {

    it('is shorter than 255 characters', () => {
      const payload = { location: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieAddLocationValidator);

      expect(result.error.details[0].path[0]).to.eql('location');
      expect(result.error.details[0].type).to.eql('string.max');
    });

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieAddLocationValidator);

      expect(result.error.details[0].path[0]).to.eql('location');
      expect(result.error.details[0].type).to.eql('any.required');
    });

  });

});
