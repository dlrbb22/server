const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Robynann1",
    host: "localhost",
    port: 5432,
    database: "resilia"
});

module.exports = pool;