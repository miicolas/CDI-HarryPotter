// dbConfig.js
const mysql = require("mysql");

const pool = mysql.createPool({ // create the pool
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", 
});

module.exports = pool;
