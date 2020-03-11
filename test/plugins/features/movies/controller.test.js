'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie using name', async () => {
      const payload = { name: 'WALL-E' };

      const movie = await Controller.create(payload);

      expect(movie.get('name')).to.eql(payload.name);
    });

  });

  describe('retrieve', () => {

    it('retrieves a list of movies by name', async () => {
      const payload = { name: 'Alcatraz' };

      const movies = await Controller.retrieve(payload);

      for (const movie of movies) {
        expect(movie.attributes.name).to.eql(payload.name);
      }
    });

    it('retrieves a list of movies by a fuzzy name', async () => {
      const payload = { name: 'Alcatraz', similar: 'true' };

      const movies = await Controller.retrieve(payload);

      expect(movies.length).to.eql(3);
      for (const movie of movies) {
        expect(movie.attributes.name).to.include(payload.name);
      }
    });

    it('retrieves a list of movies by release_year', async () => {
      const payload = { release_year: 1980 };

      const movies = await Controller.retrieve(payload);

      expect(movies.length).to.eql(5);
      for (const movie of movies) {
        expect(movie.attributes.release_year).to.eql(payload.release_year);
      }
    });

    it('retrieves a list of movies by range of years', async () => {
      const payload = { start_year: 1970, end_year: 1980 };

      const movies = await Controller.retrieve(payload);

      expect(movies.length).to.eql(30);
      for (const movie of movies) {
        expect(movie.attributes.release_year).to.be.at.least(payload.start_year);
        expect(movie.attributes.release_year).to.be.at.most(payload.end_year);
      }
    });

    it('retrieves a list of locations for a movie', async () => {
      const payload = { name: 'Alcatraz' };

      const movies = await Controller.retrieve(payload);

      for (const movie of movies) {
        expect(movie.attributes.locations).to.include('San Francisco');
      }
    });

  });

  describe('addLocation', () => {

    it('adds a location given an id and a valid location', async () => {
      const payload = { location: 'Ashburn' };
      const id = 1;

      const movie = await Controller.addLocation(id, payload);

      expect(movie.attributes.locations.length).to.be.eql(2);
      expect(movie.attributes.locations).to.include('San Francisco');
      expect(movie.attributes.locations).to.include('Ashburn');

      const index = movie.attributes.locations.indexOf('Ashburn');
      if (index > -1) {
        movie.attributes.locations.splice(index, 1);
      }
      movie.save();
      expect(movie.attributes.locations.length).to.be.eql(1);
      expect(movie.attributes.locations).to.include('San Francisco');
      expect(movie.attributes.locations).to.not.include('Ashburn');
    });

  });

});
