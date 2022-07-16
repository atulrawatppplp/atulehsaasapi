exports.up = function(knex) {
  return knex.schema.createTable('password_change_requests', table => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    table.uuid('user_id').references('user_id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('is_valid').defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('password_change_requests')
};
