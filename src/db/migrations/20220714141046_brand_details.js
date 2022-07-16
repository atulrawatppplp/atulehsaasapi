
exports.up = function(knex) {
    return knex.schema.createTable('brand_details', ( table ) => {
        table.string('CompanyId')
        table.string('BrandDetails')
        table.string('Name')
        table.string('SubID')
        table.string('servicesID')
        table.bigInteger('Year')
        table.string('Revenue')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('brand_details')
};
