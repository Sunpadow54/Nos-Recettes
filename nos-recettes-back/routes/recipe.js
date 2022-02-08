// Roads Recipe
// ------------------------- IMPORTS -------------------------

const express = require('express');
// ----- Create router
const router = new express.Router();
// ---- Import middelwares
const { authUser } = require('../middleware/auth');
// ----- Import Controlls
const recipeCtrl = require('../controllers/recipe');


// ============================================================
// ------------------------- ROADS ----------------------------

router.get('/', authUser, recipeCtrl.getAllRecipes);
router.post('/', authUser, recipeCtrl.createRecipe);
router.get('/:id', authUser, recipeCtrl.getOneRecipe);
router.put('/:id', authUser, recipeCtrl.editRecipe);
router.delete('/:id', authUser, recipeCtrl.deleteRecipe);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
