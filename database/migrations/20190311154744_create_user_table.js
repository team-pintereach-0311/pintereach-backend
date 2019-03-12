exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users.boolean('is_admin').defaultTo(false)

        users.string('username', 255)
            .notNullable()
            .unique();

        users.string('display_name');

        users.string('password', 255).notNullable();

        users.string('email');

        users.string('img_url');

        users.timestamps(false, true);


    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
