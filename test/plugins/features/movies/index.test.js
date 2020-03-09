'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { name: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('retrieve', () => {

    it('retrieves a list of movies', () => {
      return Movies.inject({
        url: '/movies?release_year=1970',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

  describe('addLocation', () => {

    it('adds a location to a movie\'s list of locations', () => {
      return Movies.inject({
        url: '/movies/13/locations',
        method: 'POST',
        payload: { location: "Ashburn" }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

});
