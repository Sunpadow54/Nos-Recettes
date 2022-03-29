// Roads Ingredient
// ------------------------- IMPORTS -------------------------

const express = require("express");
// ----- Create router
const router = new express.Router();
// ---- Import middelwares
const { authUser } = require("../middleware/auth");
// ----- Import Controlls
const ingredientCtrl = require("../controllers/ingredient");

// ============================================================
// ------------------------- ROADS ----------------------------

router.get("/", authUser, ingredientCtrl.getAll);
router.post("/", authUser, ingredientCtrl.createIngredient);
router.put("/:id", authUser, ingredientCtrl.editIngredient);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
