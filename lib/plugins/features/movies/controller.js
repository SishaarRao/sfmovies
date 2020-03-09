'use strict';

// Validators
const Movie     = require('../../../models/movie');
const MovieList = require('../../../validators/movielist');

// Libraries for SQL requests
const Knex = require('../../../libraries/knex');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.retrieve = async (query) => {
  // Use parameters to construct SQL query, store in result
  const result = Knex.select().from('movies');
  if ('release_year' in query) {
    result.where('release_year', query.release_year);
  }
  if ('start_year' in query) {
    result.where('release_year', '>=', query.start_year);
  }
  if ('end_year' in query) {
    result.where('release_year', '<=', query.end_year);
  }
  if ('name' in query) {
    if ('similar' in query && query.similar === 'true') {
      // Find fuzzy title
      // (Knex raw with positional bindings protects against SQL Injection,
      //  so no need to further sanitize input)
      result.whereRaw('LOWER(name) SIMILAR TO LOWER(?)', [`%${  query.name  }%`]);
    } else {
      result.where('name', query.name);
    }
  }

  // Convert each response to Movie model
  for (let i = 0; i < (await result).length; i++) {
    result[i] = new Movie({ id: (await result)[i].id }).fetch();
  }

  return result;
};
