// Roads Users
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = new express.Router();

// ---- Import middelwares
const { userSignUpRules, validateSignUp } = require('../middleware/validate');

// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/create', userSignUpRules(), validateSignUp , userCtrl.createUser); // ! add admin restriction
/* router.get('/:id', userCtrl.getOneRecipe);
router.put('/:id', userCtrl.editRecipe);
router.delete('/:id', userCtrl.deleteRecipe); */

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
