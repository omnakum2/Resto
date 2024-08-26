const express = require("express");
const router = express.Router();
const { getAdminCount, getStaffCount } = require("../controllers/dashboardController");

router.get("/getAdminTotal", getAdminCount);
router.get("/getStaffTotal/:id", getStaffCount);

module.exports = router;