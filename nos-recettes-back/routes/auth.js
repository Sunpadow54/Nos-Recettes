// Auth Roads
// ------------------------- IMPORTS -------------------------

const express = require('express');
// ----- Create router
const router = express.Router();
// ----- Import Controlls
const authCtrl = require('../controllers/auth');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/login', authCtrl.login);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;