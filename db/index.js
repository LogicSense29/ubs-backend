const pg = require("pg");
require("dotenv").config();

const PASSWORD = `${process.env.PASSWORD}`;
const DATABASE = `${process.env.DATABASE}`;

const db = new pg.Client({
  user: "postgres",
  host: "35.160.120.126",
  database: DATABASE,
  password: PASSWORD,
  port: 5432,
});

module.exports = db;
