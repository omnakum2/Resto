const express = require("express");
const router = express.Router();
const { getAdminCount, getStaffCount, getSpecialItem } = require("../controllers/dashboardController");

router.get("/getAdminTotal", getAdminCount);
router.get("/getStaffTotal/:id", getStaffCount);
router.get("/getSpecialItem", getSpecialItem);

module.exports = router;