// Ingredient model
// ------------------------- IMPORTS -------------------------
const db = require("../config/db-connect");
const format = require("pg-format");

// ============================================================

// Recipe constructor
// is_admin & is_active auto default in db
class Ingredient {
	constructor(ingredient) {
		this.name = ingredient.name;
	}
}

Ingredient.findAll = (filter) => {
	// define the query  / with filter if there is
	const filterFormated = filter
		? format(`WHERE name LIKE %L`, filter + "%")
		: "";
	const query = format(
		`SELECT * FROM ingredients %s ORDER BY name`,
		filterFormated
	);

	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err) return reject(err);
			// success
			resolve(res.rows);
		});
	});
};

Ingredient.create = (ingredients) => {
	const ingFormatted = ingredients.map((ingredient) => new Array(ingredient));
	// define the query
	const query = format(
		`
        INSERT INTO ingredients (name) VALUES %L 
        ON CONFLICT (name) DO NOTHING;
    `,
		ingFormatted
	);

	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err) return reject(err);
			// success
			resolve(res.rows);
		});
	});
};

Ingredient.edit = ({ id, name }) => {
	// define the query
	const query = format(
		`
            UPDATE ingredients SET name = %L WHERE id = %L
            RETURNING name;
    `,
		name,
		id
	);

	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err && err.constraint) {
				let error = new Error("This ingredient already exist");
				error.status = 409;
				return reject(error);
			}
			if (err) return reject(err);
			// success
			resolve(res.rows[0]);
		});
	});
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Ingredient;
