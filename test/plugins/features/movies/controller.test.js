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

});
