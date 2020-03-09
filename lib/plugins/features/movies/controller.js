'use strict';

// Models
const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.retrieve = async (query) => {
  // Use parameters to construct SQL query, store in result
  let result;
  await Movie.query((qb) => {
    if ('release_year' in query) {
      qb.where('release_year', query.release_year);
    }
    if ('start_year' in query) {
      qb.where('release_year', '>=', query.start_year);
    }
    if ('end_year' in query) {
      qb.where('release_year', '<=', query.end_year);
    }
    if ('name' in query) {
      if ('similar' in query && query.similar === 'true') {
        // Find fuzzy title
        // (Knex raw with positional bindings protects against SQL Injection,
        //  so no need to further sanitize input)
        qb.whereRaw('LOWER(name) SIMILAR TO LOWER(?)', [`%${  query.name  }%`]);
      } else {
        qb.where('name', query.name);
      }
    }
  })
  .fetchAll()
  .then((models) => {
    result = models.toArray();
  });
  return result;
};
