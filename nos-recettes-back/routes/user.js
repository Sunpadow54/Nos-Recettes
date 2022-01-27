// Roads Users
// ------------------------- IMPORTS -------------------------

const express = require('express');

// ----- Create router
const router = new express.Router();

// ---- Import middelwares
const { userSignUpRules, userEditRules, validateRules } = require('../middleware/validate');

// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/create', userSignUpRules(), validateRules, userCtrl.createUser); // ! add admin restriction
router.put('/:id', userEditRules(), validateRules, userCtrl.editUser);
router.get('/:id', userCtrl.getOneUser);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
