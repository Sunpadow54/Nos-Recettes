// Controls Ingredients
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Ingredient = require("../models/Ingredient");

// ============================================================
// -------------------------- CONTROLS ------------------------

exports.getAll = (req, res, next) => {
	Ingredient.findAll(req.query.search)
		.then((ingredients) => {
			res.status(200).json(ingredients);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.createIngredient = (req, res, next) => {
	Ingredient.create(req.body)
		.then(() => {
			res.status(200).json("ingredients créés");
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.editIngredient = (req, res, next) => {
	Ingredient.edit({ id: req.params.id, name: req.body })
		.then((ingredientsEdited) => {
			res.status(200).json(ingredientsEdited);
		})
		.catch((error) => res.status(error.status || 500).json(error.message));
};
