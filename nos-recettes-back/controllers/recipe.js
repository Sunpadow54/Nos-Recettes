// Controls Recipe
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Recipe = require("../models/Recipe");

// ============================================================
// -------------------------- CONTROLS ------------------------

exports.getAllRecipes = (req, res, next) => {
	Recipe.findAll(req.query)
		.then((recipes) => res.status(200).json(recipes))
		.catch((error) => res.status(500).json(error));
};

exports.getOneRecipe = (req, res, next) => {
	Recipe.findOne(req.params.id)
		.then((recipe) => {
			if (recipe === undefined) {
				let error = new Error("recipe not found");
				error.status = 404;
				throw error;
			}
			res.status(200).json(recipe);
		})
		.catch((error) => {
			res.status(error.status || 500).json(error.message);
		});
};

exports.createRecipe = (req, res, next) => {
	const newRecipe = new Recipe({
		...req.body,
		userId: res.locals.userId,
	}); // ! need to add file format

	if (req.body.ingredients) {
		delete newRecipe.ingredients;
	}
	Recipe.create(newRecipe, req.body.ingredients)
		.then((idRecipe) => {
			res.status(201).json(idRecipe);
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.editRecipe = (req, res, next) => {
	// find the recipe and check if user is author
	Recipe.findUserId(req.params.id)
		.then((recipeAuthorId) => {
			const isAuthor =
				recipeAuthorId === res.locals.userId ? true : false;
			// the user is not the author
			if (!isAuthor) {
				throw "Unauthorized";
			}

			// user is author
			const newRecipe = {
				...req.body,
			};
			if (req.body.ingredients) {
				delete newRecipe.ingredients;
			}
			const newIngredients = req.body.ingredients
				? req.body.ingredients
				: null;

			Recipe.edit(newIngredients, newRecipe, req.params.id)
				.then((editedRecipe) => res.status(201).json({ editedRecipe }))
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.deleteRecipe = (req, res, next) => {
	// find the recipe and check if user is author
	Recipe.findUserId(req.params.id)
		.then((recipeUserId) => {
			const isAuthor = recipeUserId === 1 ? true : false; // ! use res.locals
			// the user is not the author
			if (!isAuthor) {
				throw "unauthorized";
			}

			// user is author
			const ids = { recipeId: req.params.id, userId: 1 }; // ! use res.locals

			Recipe.delete(ids)
				.then((deletedRecipe) => {
					res.status(200).json("recipe deleted");
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
