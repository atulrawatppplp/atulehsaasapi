const { dbHost, dbUser, dbPassword, dbName } = require("./src/config/env");

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : dbHost || '127.0.0.1',
      user : dbUser || 'root',
      password : dbPassword || '2885',
      database : dbName || 'ehsaas',
      charset: 'utf8mb4',
      dbcollat: 'utf8mb4_unicode_ci'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : dbHost,
      database : dbName,
      user : dbUser,
      password : dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : dbHost,
      database : dbName,
      user : dbUser,
      password : dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};