exports.up = function(knex, Promise) {
  return knex.schema.createTable("categories", table => {
    table.increments();
    table.integer("user_id").notNullable();
    table
      .string("name")
      .notNullable()
      .unique();
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("categories");
};
