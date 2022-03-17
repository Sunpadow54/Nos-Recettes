// Controls Ingredients
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Ingredient = require('../models/Ingredient');

// ============================================================
// -------------------------- CONTROLS ------------------------

exports.getAll = (req, res, next) => {
    Ingredient.findAll()
        .then(ingredients => {
            let array = ingredients.map(element => element.name);
            res.status(200).json(array);
        })
        .catch(error => res.status(500).json({ error }));
};
