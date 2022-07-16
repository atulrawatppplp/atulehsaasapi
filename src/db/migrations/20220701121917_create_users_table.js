
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.uuid('user_id').primary().defaultTo(knex.raw('(UUID())'))
      table.string('first_name')
      table.string('last_name')
      table.string('email').unique().notNullable();
      table.string('password')
      table.boolean('is_active')
      table.boolean('is_owner')
      table.string('subscription_id').unique().notNullable();
      table.string('token')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  } )
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
