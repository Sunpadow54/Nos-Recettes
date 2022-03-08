// CONNEXTION TO  POSTGRESQL DATABASE
// ------------------------- IMPORTS -------------------------

const { Pool } = require('pg'); // postgre nodejs
const dotEnv = require('dotenv');
dotEnv.config()

// connection

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    /* ssl: { rejectUnauthorized: false } */
    // Pool settings
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    allowExitOnIdle: true // for tests
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


// ============================================================
// ------------------------- EXPORT ---------------------------
module.exports = pool;