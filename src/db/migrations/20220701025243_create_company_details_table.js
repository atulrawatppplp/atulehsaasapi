 exports.up = function(knex) {
    return knex.schema.createTable('company_details', ( table ) => {
      table.bigIncrements('company_id').notNullable()
      table.string('cin')
      table.string('name')
      table.integer('year')
      table.text('office_address', 'longtext')
      table.text('registered_corporate_address', 'longtext')
      table.string('email')
      table.string('phone')
      table.string('website')
      table.integer('reporting_year')
      table.boolean('is_recognized')
      table.bigInteger('authorized_capital')
      table.bigInteger('paidup_capital')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('company_details')
  };
  