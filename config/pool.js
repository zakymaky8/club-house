const { Pool } = require("pg");
require("dotenv").config();


module.exports = new Pool({
    // user: process.env.USER,
    // database: process.env.DATABASE,
    // port: process.env.DB_PORT,
    // host: "localhost",
    // password: process.env.PASSWORD
    connectionString: process.env.POSTGRES_URL
})