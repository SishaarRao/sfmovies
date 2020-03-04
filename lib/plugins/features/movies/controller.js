'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  if ('title' in payload) {
    payload.name = payload.title;
  } else {
    payload.title = payload.name;
  }
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};
