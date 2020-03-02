'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator', () => {

  describe('title', () => {

    it('is less than 255 characters', () => {
      const payload = { title: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

    it('cannot be with name', () => {
      const payload = { title: 'testerror', name: 'testerror' };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].type).to.eql('object.xor');
    });

  });

  describe('name', () => {

    it('is less than 255 characters', () => {
      const payload = { name: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

    it('cannot be with title', () => {
      const payload = { name: 'testerror', title: 'testerror' };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].type).to.eql('object.xor');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        title: 'foo',
        release_year: 1800
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year: 12345
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
