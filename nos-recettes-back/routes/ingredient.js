// Roads Ingredient
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = new express.Router();

// ---- Import middelwares


// ----- Import Controlls
const ingredientCtrl = require('../controllers/ingredient');


// ============================================================
// ------------------------- ROADS ----------------------------

router.get('/', ingredientCtrl.getAll);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
