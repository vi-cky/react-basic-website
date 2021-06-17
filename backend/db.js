const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Topgame123",
  database: "studentmanagementsystem",
  port: 5432,
  host: "localhost",
});
pool.on("connect", () => {
  console.log("connection establish");
});
module.exports = pool;
