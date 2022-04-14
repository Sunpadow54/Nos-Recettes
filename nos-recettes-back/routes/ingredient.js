// Roads Ingredient
// ------------------------- IMPORTS -------------------------

const express = require("express");
// ----- Create router
const router = new express.Router();
// ---- Import middelwares
const { authUser, authAdmin } = require("../middleware/auth");
// ----- Import Controlls
const ingredientCtrl = require("../controllers/ingredient");

// ============================================================
// ------------------------- ROADS ----------------------------

router.get("/", authUser, ingredientCtrl.getAll);
router.post("/", authUser, authAdmin, ingredientCtrl.createIngredient);
router.put("/:id", authUser, authAdmin, ingredientCtrl.editIngredient);
router.delete("/:id", authUser, authAdmin, ingredientCtrl.deleteIngredient);
// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;
