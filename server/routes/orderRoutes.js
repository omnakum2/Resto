const express = require("express");
const { newOrder,editOrder, checkoutOrder, deleteOrder, userWiseOrder, viewFullOrder, allOrders } = require("../controllers/orderController");
const router = express.Router();

router.post("/newOrder", newOrder);
router.get("/allOrders", allOrders);
router.get("/userOrder/:id", userWiseOrder);
router.get("/viewOrder/:id", viewFullOrder);
router.put("/editOrder", editOrder);
router.put("/checkoutOrder", checkoutOrder);
router.delete("/:id", deleteOrder);

module.exports = router;