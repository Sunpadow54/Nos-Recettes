const db = require("../config/db-connect");
const fs = require("fs");
const jwToken = require("jsonwebtoken");
const { Client } = require("pg");

const pgClient = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: 5432,
	password: process.env.DB_PASS,
	database: "postgres",
});

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
		await db.query(
			`${fs.readFileSync("./config/db_dump-postgresql.sql").toString()}`
		);
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

beforeAll(async () => {
	await createDbTest();
	await initializeDbTest();
	// create a fake token for all roads
	return (token = jwToken.sign({ userId: 1 }, process.env.TOKEN_KEY, {
		expiresIn: "2h",
	}));
});

afterAll(async () => {
	await clearDbTest();
});
