// Recipe model
// ------------------------- IMPORTS -------------------------
const db = require("../config/db-connect");
const format = require("pg-format");

// ============================================================

// Recipe constructor
class Recipe {
	constructor(recipe) {
		this.id_user = recipe.userId;
		this.created_at = new Date();
		this.title = recipe.title;
		this.duration = recipe.duration;
		this.preparation = recipe.preparation;
		this.img = recipe.img;
		this.category = recipe.category;
	}
}

// ============================================================

Recipe.create = (newRecipe, ingredients) => {
	const recipeKeys = format(`%s`, Object.keys(newRecipe));
	let recipeValues = format(`%L`, Object.values(newRecipe));
	// construct Array insert for postgresql
	recipeValues = recipeValues.replaceAll("(", "ARRAY[");
	recipeValues = recipeValues.replaceAll(")", "]");

	const query = `WITH data(ingredient, quantity, unit) AS (
            VALUES ${format(`%L`, ingredients)}
        ),
        insertRecipe AS (
            INSERT INTO recipes (${recipeKeys}) 
            VALUES (${recipeValues})
            RETURNING id AS id_recipe, title
        ),
        insertIngredients AS (
            INSERT INTO ingredients (name)
            SELECT data.ingredient FROM data
            ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING name, id AS id_ingredients
        )
        INSERT INTO recipe_ingredients (id_recipe, id_ingredient, quantity, unit)
        SELECT r.id_recipe, ing.id_ingredients, d.quantity::INTEGER, d.unit
        FROM insertRecipe AS r, data AS d
        INNER JOIN insertIngredients AS ing
            ON d.ingredient = ing.name
        RETURNING id_recipe as id
        ;`;
	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err) return reject(err);
			// success
			resolve(res.rows[0]);
		});
	});
};

Recipe.findAll = (baseFilters, ingrFilters) => {
	let query = "";
	let filters = "";
	// ---- Format filters if there is;
	// Ingredient filter ?
	if (ingrFilters) {
		let insert =
			ingrFilters.length > 1
				? `IN (${ingrFilters.join(", ")})`
				: `= ${ingrFilters[0]}`;
		// start query
		query = `WITH recipeIds AS (
            SELECT id_recipe AS ids
                FROM recipe_ingredients 
                WHERE id_ingredient ${insert}
        ) `;
		// create filters
		filters += "WHERE id IN (SELECT ids FROM recipeIds) ";
	}

	// Main filters ?
	if (Object.keys(baseFilters).length > 0) {
		let filtersArray = [];
		for (const [key, value] of Object.entries(baseFilters)) {
			filtersArray.push(`${key}='${value}'`);
		}
		// create || continue filters
		filters += ingrFilters
			? `AND ${filtersArray.join(" AND ")}`
			: `WHERE ${filtersArray.join(" AND ")}`;
	}

	// ---- query
	query += `
        SELECT 
            id, r.id_user, r.created_at AS date, r.img, r.duration, r.title,
            i.ingredients
        FROM  recipes AS r
        LEFT JOIN (
            SELECT  
                ri.id_recipe AS id,
                ARRAY_AGG(i.name) AS ingredients
            FROM   recipe_ingredients AS ri
            JOIN   ingredients AS i  ON i.id = ri.id_ingredient
            GROUP  BY ri.id_recipe
        ) i USING (id)
        ${filters}
        ORDER BY r.created_at DESC;
    `;

	console.log(query);
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

Recipe.findOne = (id) => {
	const query = format(
		`SELECT 
            r.id, CONCAT(u.firstname, ' ', u.lastname) AS "author",
            r.id_user AS "authorId",
            r.created_at AS date, r.duration, r.title, r.preparation,
            r.img, r.category,
            ri.ingredients
        FROM recipes AS r
        JOIN users AS u ON r.id_user = u.id
        LEFT JOIN (
            SELECT 
                id_recipe,
                JSON_AGG(JSON_BUILD_OBJECT('name', i.name, 'quantity', quantity, 'unit', unit )) AS ingredients
            FROM recipe_ingredients
            LEFT JOIN ingredients AS i ON id_ingredient = i.id
            GROUP BY id_recipe
        ) ri ON id_recipe = r.id
        WHERE r.id = %L
        ;`,
		id
	);

	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err) return reject(err);
			if (res.rows[0] === undefined) {
				let error = new Error("recipe not found");
				error.status = 404;
				return reject(error);
			}
			// success
			resolve(res.rows[0]);
		});
	});
};

Recipe.findUserId = (idRecipe) => {
	const query = format(
		`SELECT 
            id_user
        FROM recipes
        WHERE id = %L
        ;`,
		idRecipe
	);

	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err) return reject(err);
			if (res.rowCount === 0) return reject("This recipe does not exist");
			// success
			resolve(res.rows[0].id_user);
		});
	});
};

Recipe.edit = (newIngredients, newRecipe, idRecipe) => {
	// initialize the DB Query
	let query = "";

	// Populate Query if the ingredients have changed
	if (newIngredients) {
		query += format(
			`WITH data(ingredient, quantity, unit) AS (
                VALUES %L
            ),
            insertIngredients AS (
                INSERT INTO ingredients (name)
                SELECT data.ingredient FROM data
                ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
                RETURNING name, id AS id_ingredient
            ),
            deleteRecipeIngr AS (
                DELETE FROM recipe_ingredients WHERE id_recipe = %L
            ),
            insertRecipeIngr AS (
                INSERT INTO recipe_ingredients (id_recipe, id_ingredient, quantity, unit)
                SELECT %L, i.id_ingredient, d.quantity::INTEGER, d.unit
                FROM data AS d
                INNER JOIN insertIngredients AS i
                    ON d.ingredient = i.name
                ON CONFLICT (id_recipe, id_ingredient) 
                DO UPDATE
                    SET
                        quantity = EXCLUDED.quantity::INTEGER,
                        unit = EXCLUDED.unit
            ) `,
			newIngredients,
			idRecipe,
			idRecipe
		);
		// Complete query if there is no change in the recipe
		if (Object.keys(newRecipe).length === 0) {
			query += `SELECT 
                    JSON_AGG(
                        JSON_BUILD_OBJECT('name', ingredient, 'quantity', quantity::INTEGER, 'unit', unit )
                    ) AS ingredients
                FROM data ;`;
		}
	}

	// Populate Query if the recipe changed
	if (Object.keys(newRecipe).length !== 0) {
		// format inserts preparations && || recipe
		if (newRecipe.preparation) {
			newRecipe.preparation = "{" + newRecipe.preparation.join(",") + "}";
		}
		let recipeInserts = [];
		for (let key in newRecipe) {
			recipeInserts.push(format("%s = %L", key, newRecipe[key]));
		}
		// Start query
		query += newIngredients ? ",updateRecipe AS (" : "";
		query += format(
			`UPDATE recipes 
                    SET %s
                WHERE id = %L
            RETURNING ${Object.keys(newRecipe)}
            `,
			recipeInserts,
			idRecipe
		);
		// End query
		query += newIngredients
			? `)
            SELECT updateRecipe.*, data.ingredients
            FROM updateRecipe 
            CROSS JOIN ( 
                SELECT
                    JSON_AGG(
                        JSON_BUILD_OBJECT('name', ingredient, 'quantity', quantity::INTEGER, 'unit', unit )
                    ) AS ingredients
                    FROM data
                ) data
            ;`
			: ";";
	}

	// ask db
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			if (err) return reject(err);
			// success
			resolve(res.rows[0]);
		});
	});
};

Recipe.delete = ({ recipeId, userId }) => {
	// define the query
	const query = format(
		`DELETE FROM recipes WHERE id = %L AND id_user = %L`,
		recipeId,
		userId
	);

	// ask client
	return new Promise((resolve, reject) => {
		db.query(query, (err, res) => {
			// error
			//if (res.affectedRows === 0) return reject('Could not delete this Post')
			if (err) return reject(err);
			// success
			resolve("deleted");
		});
	});
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Recipe;
