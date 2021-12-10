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
router.post('/', recipeCtrl.createRecipe);
router.get('/:id', recipeCtrl.getOneRecipe);
router.put('/:id', recipeCtrl.editRecipe);
router.delete('/:id', recipeCtrl.deleteRecipe);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
