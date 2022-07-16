exports.up = function(knex) {
    return knex.schema.createTable('product_service', ( table ) => {
        table.bigIncrements('servicesID').notNullable()
        table.string('CompanyId')
        table.string('SubID')
        table.string('Product_Service_Name')
        table.string('NIC_code')
        table.string('TurnOver')
        table.string('activity_grp_desc')
        table.string('Buisiness_code')
        table.string('Buisiness_code_desc')
        table.string('State')
        table.string('City')
        table.string('Country')
        table.bigInteger('Year')
        table.string('SupportedCategory')
      })
};


exports.down = function(knex) {
    return knex.schema.dropTable('product_service')
};
