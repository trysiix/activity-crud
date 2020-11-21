
exports.up = function(knex) {
    return knex.schema.createTable('activitys', function (table) {
      table.string('activity_id').primary();
      table.string('name',25).notNullable();
      table.string('type').notNullable();
      table.string('priority').notNullable();
      table.string('description',120);
      table.date('date').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('activitys')
  };
  