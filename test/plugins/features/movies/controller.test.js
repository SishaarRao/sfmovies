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

    it('retrieves a movie by name', async () => {
      const payload = { name: 'Alcatraz' };

      const movie = await Controller.retrieve(payload)

      expect (movie.get('name')).to.eql(payload.name);
      // expect (movie.get(''))
    });

  });

});
