// Controls Recipe
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Recipe = require('../models/Recipe');

// ============================================================
// -------------------------- CONTROLS ------------------------


exports.createRecipe = (req, res, next) => {
	const newRecipe = new Recipe({
		...req.body.recipe,
		userId: 1 // use res.locals 
	});

	Recipe.create(newRecipe, req.body.ingredients)
		.then(newRecipe => res.status(201).json({newRecipe}))
		.catch(error => res.status(500).json({error}))
};

