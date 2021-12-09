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

exports.getOneRecipe = (req, res, next) => {
    Recipe.findOne(req.params.id)
        .then(recipe => res.status(201).json(recipe))
        .catch(error => res.status(500).json({ error }));
};

exports.createRecipe = (req, res, next) => {
    const newRecipe = new Recipe({
        ...req.body.recipe,
        userId: 1 // ! use res.locals 
    }); // ! need to add file format

    Recipe.create(newRecipe, req.body.ingredients)
        .then(newRecipe => res.status(201).json({ newRecipe }))
        .catch(error => res.status(500).json({ error }))
};


exports.editRecipe = (req, res, next) => {
    // find the recipe and check if user is author
    Recipe.findRecipeUserId(req.params.id)
        .then(recipeUserId => {
            const isAuthor = recipeUserId === 1 ? true : false; // ! use res.locals
            // the user is not the author
            if (!isAuthor) { throw 'unauthorized' };

            // user is author
            const newRecipe = {
                ...req.body.editedRecipe
            };
            const newIngredients = req.body.editedIngredients ? req.body.editedIngredients : null;

            Recipe.edit(newIngredients, newRecipe, req.params.id)
                .then((editedRecipe) => res.status(201).json({ editedRecipe }))
        })
        .catch(error => res.status(500).json({ error }));
};