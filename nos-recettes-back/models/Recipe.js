// Recipe model
// ------------------------- IMPORTS -------------------------
const db = require('../config/db-connect');
const format = require('pg-format');

// ============================================================

// constructor 
class Recipe {
    constructor(recipe) {
		this.id_user = recipe.userId;
        this.created_at = new Date();
		this.duration = recipe.duration;
        this.title = recipe.title;
        this.preparation = recipe.preparation;
        this.img = recipe.img;
		this.category = recipe.category;
    }
}


// ============================================================

Recipe.create = (newRecipe) => {
    // define client query
    const keys = format(`%s`, Object.keys(newRecipe));
    let values = format(`%L`,Object.values(newRecipe));
    // construct Array insert for postgresql
    values = values.replaceAll('(', 'ARRAY[');
    values = values.replaceAll(')', ']');

    const query = `INSERT INTO recipes (${keys}) VALUES (${values})`;

    console.log(query);
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