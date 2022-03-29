// Roads Users
// ------------------------- IMPORTS -------------------------

const express = require('express');
// ----- Create router
const router = new express.Router();
// ---- Import middelwares
const { userSignUpRules, userEditRules, validateRules } = require('../middleware/validate');
const { authUser, authAdmin } = require('../middleware/auth');
// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/create', authUser, authAdmin, userSignUpRules(), validateRules, userCtrl.createUser);
router.put('/:id', authUser, userEditRules(), validateRules, userCtrl.editUser);
router.get('/:id', authUser, userCtrl.getOneUser);
router.delete('/:id', authUser, userCtrl.delete);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
