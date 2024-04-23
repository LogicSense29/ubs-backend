const pg = require("pg");
require("dotenv").config();

const PASSWORD = `${process.env.PASSWORD}`;
const DATABASE = `${process.env.DATABASE}`;

const db = new pg.Client({
  user: "postgres",
  host: "35.160.120.126" || "44.233.151.27" || "34.211.200.85",
  database: DATABASE,
  password: PASSWORD,
  port: 5432,
});

module.exports = db;
