// Controls Recipe
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Recipe = require('../models/Recipe');

// ============================================================
// -------------------------- CONTROLS ------------------------
exports.getAllRecipes = (req, res, next) => {
    Recipe.findAll()
        .then(recipes => res.status(201).json(recipes))
        .catch(error => res.status(500).json({ error }));
};

exports.createRecipe = (req, res, next) => {
	const newRecipe = new Recipe({
		...req.body.recipe,
		userId: 1 // ! use res.locals 
	}); // ! need to add file format

	Recipe.create(newRecipe, req.body.ingredients)
		.then(newRecipe => res.status(201).json({newRecipe}))
		.catch(error => res.status(500).json({error}))
};

exports.getOneRecipe = (req, res, next) => {
    Recipe.findOne(req.params.id)
        .then(recipe => res.status(201).json(recipe))
        .catch(error => res.status(500).json({ error }));
}

