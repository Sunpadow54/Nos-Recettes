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

router.post('/create', userSignUpRules(), validateSignUp, userCtrl.createUser); // ! add admin restriction
router.put('/edit', userCtrl.editUser);
router.get('/', userCtrl.getOneUser);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
