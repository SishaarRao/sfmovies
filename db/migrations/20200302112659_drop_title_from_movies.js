'use strict';

exports.up = async (Knex) => {
  await Knex.schema.table('movies', (table) => {
    table.dropColumn('title');
  });
  await Knex.raw('ALTER TABLE movies ADD CONSTRAINT movies_name_not_null CHECK (name IS NOT NULL) NOT VALID');
  await Knex.raw('ALTER TABLE movies VALIDATE CONSTRAINT movies_name_not_null');
};

exports.down = async (Knex) => {
  await Knex.schema.table('movies', (table) => {
    table.text('title');
  });
  await Knex.raw('ALTER TABLE movies DROP CONSTRAINT movies_name_not_null');
};
