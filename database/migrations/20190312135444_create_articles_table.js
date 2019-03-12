exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", table => {
    table.increments();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string("title");
    table.string("cover_page");
    table.text("link");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("articles");
};
