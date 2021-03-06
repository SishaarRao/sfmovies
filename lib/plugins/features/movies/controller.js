'use strict';

// Models
const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.retrieve = async (query) => {
  // Use parameters to construct SQL query, store in result
  const movies = await Movie.query((qb) => {
    if (query.release_year) {
      qb.where('release_year', query.release_year);
    }
    if (query.start_year) {
      qb.where('release_year', '>=', query.start_year);
    }
    if (query.end_year) {
      qb.where('release_year', '<=', query.end_year);
    }
    if (query.name) {
      if (query.similar) {
        // Find fuzzy title
        // (Knex raw with positional bindings protects against SQL Injection,
        //  so no need to further sanitize input)
        qb.whereRaw('LOWER(name) SIMILAR TO LOWER(?)', [`%${  query.name  }%`]);
      } else {
        qb.where('name', query.name);
      }
    }
  })
  .fetchAll();

  return movies.toArray();
};

exports.addLocation = async (id, payload) => {
  const movie = await new Movie({ id }).fetch();
  if (!movie.attributes.locations.includes(payload.location)) {
    movie.attributes.locations.push(payload.location);
  }
  await movie.save();
  return movie;
};
