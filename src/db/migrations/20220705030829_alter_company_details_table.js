
exports.up = async function(knex) {
  await knex.schema.alterTable('company_details', t => {
      t.string('subscription_id')
  })
};


exports.down = async function(knex) {
    await knex.schema.alterTable('company_details', t => {
        t.dropColumn('subscription_id')
    })
};
