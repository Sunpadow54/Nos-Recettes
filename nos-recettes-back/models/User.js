// User model
// ------------------------- IMPORTS -------------------------
const db = require("../config/db-connect");
const format = require("pg-format");

// ============================================================

// Recipe constructor
// is_admin & is_active auto default in db
class User {
	constructor(user) {
		this.username = user.username;
		this.email = user.email;
		this.pass = user.password;
		this.lastname = user.lastname;
		this.firstname = user.firstname;
	}
}

User.create = (newUser) => {
	// define the query
	const insert = Object.keys(newUser);
	const values = Object.values(newUser);
	const query = format(`INSERT INTO users (%s) VALUES (%L)`, insert, values);
	// ask client
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err && err.constraint === "users_username_key") {
				let error = new Error("This username already exist");
				error.status = 409;
				return reject(error);
			}
			if (err && err.constraint === "users_email_key") {
				let error = new Error("This email already exist");
				error.status = 409;
				return reject(error);
			}
			if (err) return reject(err /* .stack */);
			// success
			resolve("User is successfully created");
		});
	});
};

User.findOne = (user) => {
	const insert = Object.keys(user);
	const value = Object.values(user);

	// define the query
	const query = format(
		`SELECT u.*, nbr
        FROM users AS u
        FULL OUTER JOIN (
            SELECT id_user, COUNT(*)::int AS nbr
            FROM recipes
            GROUP BY id_user
        ) r ON r.id_user = u.id
        WHERE u.%s = %L
        ;`,
		insert,
		value
	);

	// ask client
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// errors
			if (err) return reject(err);
			if (res.rows[0] === undefined) {
				let error = new Error("This account does not exist");
				error.status = 404;
				return reject(error);
			}
			// success
			resolve(res.rows[0]);
		});
	});
};

User.edit = (user, userId) => {
	// format the insert for SET
	let inserts = [];
	for (let key in user) {
		inserts.push(format("%s = %L", key, user[key]));
	}
	const returning = Object.keys(user).filter((e) => e !== "pass");

	// define the query
	const query = format(
		`
            UPDATE users 
                SET %s 
            WHERE id = %L
            RETURNING %s
            ;`,
		inserts,
		userId,
		returning
	);

	// ask client
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// errors
			if (err && err.constraint === "users_username_key")
				return reject("This username already exist");
			if (err && err.constraint === "users_email_key")
				return reject("This email already exist");
			if (err) return reject(err);
			// if (res.changedRows === 0) return reject('This User has not been updated')
			// success
			resolve(res.rows[0]);
		});
	});
};

User.delete = (userId) => {
	const query = format(`DELETE FROM users WHERE id = %L;`, userId);
	// ask client
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// errors
			if (err) return reject(err);
			// success
			resolve("user successfully deleted");
		});
	});
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = User;
