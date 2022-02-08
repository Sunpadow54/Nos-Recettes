// Ingredient model
// ------------------------- IMPORTS -------------------------
const db = require('../config/db-connect');
const format = require('pg-format');

// ============================================================

// Recipe constructor
// is_admin & is_active auto default in db
class Ingredient {
    constructor(ingredient) {
        this.name = ingredient.name;
    }
}


Ingredient.findAll = () => {
    // define the query
    const query = format(`SELECT * FROM ingredients ORDER BY name`);
    // ask db
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            // error
            if (err) return reject(err);
            // success
            resolve(res.rows);
        });
    })
};




// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = Ingredient;