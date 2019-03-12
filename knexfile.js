// Update with your config settings.
require('dotenv').config()
const password = process.env.DATABASE_PASSWORD

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: password,
      database: 'pintereach'
    }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
