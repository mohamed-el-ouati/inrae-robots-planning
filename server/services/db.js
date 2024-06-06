const { Pool } = require("pg");
// const pool = new Pool({
//   host: "localhost", //db
//   port: 5432,
//   user: "postgres",
//   password: "1919",
//   database: "db6",
// });

const pool = new Pool({
  host: "10.63.64.48", //db
  port: 5432,
  user: "pgadmin4",
  password: "romea63*",
  database: "superRob2",
});

module.exports = pool;
