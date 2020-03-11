'use strict';

const TABLE = 'movies';
const COLUMN_NAME = 'locations';
// const DEFAULT_LOCATION = 'San Francisco';

exports.up = async (knex) => {
  await knex.schema.table(TABLE, (table) => {
    table.specificType(COLUMN_NAME, 'text[]');
  });
  // Set default value, will be done in second step
  // await knex.raw(`ALTER TABLE ${TABLE} ALTER COLUMN ${COLUMN_NAME} SET DEFAULT '{ "${DEFAULT_LOCATION}" }' `);
};

exports.down = async (knex) => {
  await knex.schema.table(TABLE, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};
