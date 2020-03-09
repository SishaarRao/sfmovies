'use strict';

const MovieValidator              = require('../../../validators/movie');
const MovieListValidator          = require('../../../validators/movielist');
const MovieAddLocationValidator   = require('../../../validators/movielocation');
const MovieAddLocationIDValidator = require('../../../validators/movielocationid');
const Controller                  = require('./controller');

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
    },
    {
      method: 'POST',
      path: '/movies/{id}/locations',
      config: {
        handler: (request, reply) => {
          reply(Controller.addLocation(request.params.id, request.payload));
        },
        validate: {
          payload: MovieAddLocationValidator,
          params: MovieAddLocationIDValidator
        }
      }
    }
  ]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
