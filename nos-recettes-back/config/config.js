const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
	path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

module.exports = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 3000,
	DB_HOST: process.env.HOST || "localhost",
	DB_NAME: process.env.DB_NAME,
	DB_USER: process.env.DB_USER,
	DB_PASS: process.env.DB_PASS,
	TOKEN_KEY: process.env.TOKEN_KEY,
	EMAIL_CRYPTO_KEY: process.env.EMAIL_CRYPTO_KEY,
};
