// Controls Recipe
// ------------------------- IMPORTS -------------------------

// ---- import Models
const Recipe = require("../models/Recipe");

// ============================================================
// -------------------------- CONTROLS ------------------------

exports.getAllRecipes = (req, res, next) => {
	// if ingredients
	const baseFilters = Object.keys(req.query).length > 0 && req.query;
	const ingrFilters =
		Object.keys(req.query).includes("ingredient") &&
		req.query.ingredient.split("-");

	if (Object.keys(req.query).includes("ingredient")) {
		delete baseFilters.ingredient;
	}

	Recipe.findAll(baseFilters, ingrFilters)
		.then((recipes) => res.status(200).json(recipes))
		.catch((error) => res.status(500).json(error));
};

exports.getOneRecipe = (req, res, next) => {
	Recipe.findOne(req.params.id)
		.then((recipe) => res.status(200).json(recipe))
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
			const canEdit =
				recipeAuthorId === res.locals.userId || res.locals.isAdmin
					? true
					: false;
			// the user is not the author or admin
			if (!canEdit) {
				let error = new Error("Unauthorized");
				error.status = 401;
				throw error;
			}

			// user is author or admin
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
				.then((editedRecipe) => res.status(200).json(editedRecipe))
				.catch((error) => res.status(320).json({ error }));
		})
		.catch((error) => res.status(error.status || 500).json(error.message));
};

exports.deleteRecipe = (req, res, next) => {
	// find the recipe and check if user is author
	Recipe.findUserId(req.params.id)
		.then((recipeUserId) => {
			const isAuthor = recipeUserId === res.locals.userId ? true : false; // ! use res.locals
			// the user is not the author
			if (!isAuthor) {
				let error = new Error("Unauthorized");
				error.status = 401;
				throw error;
			}

			// user is author
			const ids = { recipeId: req.params.id, userId: res.locals.userId };

			Recipe.delete(ids)
				.then(() => {
					res.status(200).json("recipe deleted");
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(error.status || 500).json(error.message));
};
