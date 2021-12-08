// Recipe model
// ------------------------- IMPORTS -------------------------
const db = require('../config/db-connect');
const format = require('pg-format');

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

/* query create the Recipe + the Recipe_ingredients + ingredients (if they are not yet in the db) */ 
Recipe.create = (newRecipe, ingredients) => {
    const recipeKeys = format(`%s`, Object.keys(newRecipe));
    let recipeValues = format(`%L`, Object.values(newRecipe));
    // construct Array insert for postgresql
    recipeValues = recipeValues.replaceAll('(', 'ARRAY[');
    recipeValues = recipeValues.replaceAll(')', ']');

    const query =
        `WITH  data(ingredient, quantity, unit) AS (
            VALUES ${format(`%L`, ingredients)}
        ),
        insertRecipe AS(
            INSERT INTO recipes (${recipeKeys}) 
            VALUES (${recipeValues})
            RETURNING id AS id_recipe, title
        ),
        insertIngredients AS (
            INSERT INTO ingredients (name)
            SELECT data.ingredient FROM data
            ON     CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING name, id AS id_ingredients
        )
        INSERT INTO recipe_ingredients (id_recipe, id_ingredient, quantity, unit)
        SELECT r.id_recipe, ing.id_ingredients, d.quantity::INTEGER, d.unit
        FROM insertRecipe AS r, data AS d
        INNER JOIN insertIngredients AS ing
            ON d.ingredient = ing.name
        ;`;
    // ask client
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(res);
        });
    })
}

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Recipe;