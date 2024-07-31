const express = require("express");
const { getTables, getTable, addTable, updateTable, deleteTable, toggleStatus } = require("../controllers/tableController");
const router = express.Router();

router.get("/", getTables);
router.post("/", addTable);
router.get("/:id", getTable);
router.put("/:id", updateTable);
router.patch("/:id", toggleStatus);
router.delete("/:id", deleteTable);

module.exports = router;
