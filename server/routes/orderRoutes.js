const express = require("express");
const { newOrder,editOrder, checkoutOrder, deleteOrder, makeBill } = require("../controllers/orderController");
const router = express.Router();

router.post("/newOrder", newOrder);
router.put("/editOrder", editOrder);
router.put("/checkoutOrder", checkoutOrder);
router.delete("/:id", deleteOrder);
router.get("/:id", makeBill);

module.exports = router;