const Pool = require("pg").Pool;

const pool = new Pool({
    user: "rob",
    password: "hotDog",
    host: "localhost",
    port: 5432,
    database: "perntodo" 
});
module.exports = pool;