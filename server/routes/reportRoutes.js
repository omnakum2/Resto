const express = require("express");
const router = express.Router();
const { getMostSoldItems, totalSalesMonthly, totalSalesYearly, userWiseSales } = require("../controllers/reportController");

router.get("/getMostSell", getMostSoldItems);
router.get("/monthlySales", totalSalesMonthly);
router.get("/yearlySales", totalSalesYearly);
router.get("/userSales", userWiseSales);

module.exports = router;