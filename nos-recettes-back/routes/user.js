// Roads Users
// ------------------------- IMPORTS -------------------------

const express = require('express');
// ----- Create router
const router = new express.Router();
// ---- Import middelwares
const { userSignUpRules, userEditRules, validateRules } = require('../middleware/validate');
const { authUser } = require('../middleware/auth');
// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/create', authUser, userSignUpRules(), validateRules, userCtrl.createUser); // ! add admin restriction
router.put('/:id', authUser, userEditRules(), validateRules, userCtrl.editUser);
router.get('/:id', authUser, userCtrl.getOneUser);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
