const express = require("express");
const {getCategories,getCategory,addCategories,updateCategories,deleteCategories} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getCategories)
router.get("/:id", getCategory)
router.post("/", addCategories)
router.put("/:id", updateCategories)
router.delete("/:id", deleteCategories)

module.exports = router;