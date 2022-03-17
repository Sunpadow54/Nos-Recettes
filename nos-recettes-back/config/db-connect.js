const { Pool } = require("pg"); // postgre nodejs
const config = require("./config"); // env variables

const connectConfig = {
	host: config.DB_HOST,
	user: config.DB_USER,
	port: 5432,
	password: config.DB_PASS,
	database: config.DB_NAME,
	/* ssl: { rejectUnauthorized: false } */
	// Pool settings
	max: 20,
	connectionTimeoutMillis: 0,
	idleTimeoutMillis: 0,
	allowExitOnIdle: true, // for tests
};

// connection
const db = new Pool({ ...connectConfig });

db.on("error", (err, client) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

// ============================================================
// ------------------------- EXPORT ---------------------------
module.exports = db;
