exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles_categories_relationship", table => {
    table.increments();
    table.integer("articles_id").unsigned();
    table
      .foreign("articles_id")
      .references("articles.id")
      .onDelete("CASCADE");
    table.integer("categories_id").unsigned();
    table
      .foreign("categories_id")
      .references("categories.id")
      .onUpdate("NO ACTION");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("articles_categories_relationship");
};
