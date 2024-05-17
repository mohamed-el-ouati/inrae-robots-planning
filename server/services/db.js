const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost", //db
  port: 5432,
  user: "postgres",
  password: "1919",
  database: "db6",
});

module.exports = pool;
