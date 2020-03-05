'use strict';

const Joi = require('joi');

const MovieListValidator = require('../../lib/validators/movielist');

describe('movie list validator', () => {

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        release_year: 1800
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        release_year: 18000
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('cannot be with start_year', () => {
      const payload = {
        release_year: 1990,
        start_year: 1995
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
    });

    it('cannot be with end_year', () => {
      const payload = {
        release_year: 1990,
        end_year: 1995
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
    });

  });

  describe('start_year', () => {

    it('is after 1878', () => {
      const payload = {
        start_year: 1800
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('start_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        start_year: 18000
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('start_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('cannot be with release_year', () => {
      const payload = {
        start_year: 1990,
        release_year: 1995
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
    });

  });

  describe('end_year', () => {

    it('is after 1878', () => {
      const payload = {
        end_year: 1800
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('end_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        end_year: 18000
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('end_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('cannot be with release_year', () => {
      const payload = {
        end_year: 1990,
        release_year: 1995
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
    });

  });

  describe('name', () => {

    it('is less than 255 characters', () => {
      const payload = { name: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('similar', () => {

    it('is a boolean', () => {
      const payload = { similar: 'testfail' };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path[0]).to.eql('similar');
    });

  });

});
