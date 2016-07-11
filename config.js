module.exports = {
  sql: {
    database: 'fly_tracer',
    username: 'root',
    password: 'ZLlwj&@!521',
    options: {
      host: "localhost",
      port: 3306,
      dialect: 'mysql', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  },
  port: 3000,
  mongo: {
    uri: 'mongodb://localhost:27017/fly_tracer'
  },
  seedDB: true,
  seedMongoDB: false,
  seedDBForce: false, //process.env.NODE_ENV === 'development',
  passwordSalt: "104E3CE4-2DBD-3229-8E04-72E7451152D7#@%7^&",
  sessionSalt: "104E3CE4-2DBD-3229-8E04-#@%7^&-72E7451152D7",
  db: 'sql' // mongo,sql if you want to use any SQL change dialect above in sql config
};
