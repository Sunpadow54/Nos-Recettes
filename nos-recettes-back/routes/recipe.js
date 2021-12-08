// Roads Recipe
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = new express.Router();

// ---- Import middelwares


// ----- Import Controlls
const recipeCtrl = require('../controllers/recipe');


// ============================================================
// ------------------------- ROADS ----------------------------

router.get('/', recipeCtrl.getAllRecipes);
router.get('/:id', recipeCtrl.getOneRecipe);
router.post('/', recipeCtrl.createRecipe);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
