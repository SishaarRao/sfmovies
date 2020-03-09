'use strict';

const Joi = require('joi');

const MovieAddLocationIDValidator = require('../../lib/validators/movielocationid');

describe('movie location id validator', () => {

  describe('id', () => {

    it('is greater than 1', () => {
      const params = {
        id: -5
      };
      const result = Joi.validate(params, MovieAddLocationIDValidator);

      expect(result.error.details[0].path[0]).to.eql('id');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is required', () => {
      const params = {};
      const result = Joi.validate(params, MovieAddLocationIDValidator);

      expect(result.error.details[0].path[0]).to.eql('id');
      expect(result.error.details[0].type).to.eql('any.required');
    });

  });

});
