const express = require("express");
const router = express.Router();
const { newUser } = require("../controllers/userController");

router.post("/register", newUser);


module.exports = router;