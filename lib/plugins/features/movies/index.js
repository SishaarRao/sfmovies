'use strict';

const MovieValidator = require('../../../validators/movie');
const MovieListValidator = require('../../../validators/movielist');
const Controller     = require('./controller');

exports.register = (server, options, next) => {

  server.route([
    {
      method: 'POST',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.create(request.payload));
        },
        validate: {
          payload: MovieValidator
        }
      }
    },
    {
      method: 'GET',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.retrieve(request.query));
        },
        validate: {
          query: MovieListValidator
        }
      }
    }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
