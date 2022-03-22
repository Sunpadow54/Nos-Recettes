const db = require("../config/db-connect");
const fs = require("fs");
const jwToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { encryptEmail } = require("../middleware/crypto.js"); // import crypto tool
const { Client } = require("pg");

const pgClient = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: 5432,
	password: process.env.DB_PASS,
	database: "postgres",
});

// Functions

const createDbTest = async () => {
	try {
		await pgClient.connect();
		const searchDbTest = await pgClient.query(
			`SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}';`
		);
		if (searchDbTest.rowCount === 0) {
			await pgClient.query(`CREATE DATABASE ${process.env.DB_NAME}`);
		}
		return true;
	} catch (err) {
		return err;
	} finally {
		pgClient.end();
	}
};
const initializeDbTest = async () => {
	try {
		// Create tables
		await db.query(
			`${fs.readFileSync("./config/db_dump-postgresql.sql").toString()}`
		);
		// Add admin 1 & user
		const password = await bcrypt.hash("password", 10);
		await db.query(`
            INSERT INTO users (username, email, pass, is_admin, is_active, lastname, firstname) VALUES
            ('admin', '${encryptEmail(
				"admin@email.com"
			)}', '${password}', true, true, 'admin', '1'),
            ('user', '${encryptEmail(
				"user@email.com"
			)}', '${password}', false, true, 'user lastname', 'user firstname');`);
		return "test database is populated";
	} catch (err) {
		return false;
	}
};
const clearDbTest = async () => {
	try {
		await db.query(
			`DROP TABLE IF EXISTS users, recipes, recipe_ingredients, ingredients`
		);
		return "test database is cleared";
	} catch (err) {
		return false;
	} finally {
		db.end();
	}
};

// Hooks

beforeAll(async () => {
	await createDbTest();
	await initializeDbTest();
	// create a fake token for all roads
	return (token = {
		admin: jwToken.sign(
			{ userId: 1, isAdmin: true, isActive: true },
			process.env.TOKEN_KEY,
			{ expiresIn: "2h" }
		),
		user: jwToken.sign(
			{ userId: 2, isAdmin: false, isActive: true },
			process.env.TOKEN_KEY,
			{ expiresIn: "2h" }
		),
		otherUser: jwToken.sign(
			{ userId: 10, isAdmin: false, isActive: true },
			process.env.TOKEN_KEY,
			{ expiresIn: "2h" }
		),
		inactive: jwToken.sign(
			{ userId: 2, isAdmin: false, isActive: false },
			process.env.TOKEN_KEY,
			{ expiresIn: "2h" }
		),
	});
});

afterAll(async () => {
	await clearDbTest();
});
