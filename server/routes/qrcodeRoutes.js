const express = require("express");
const { makeQRCode, getQRCode } = require("../controllers/qrcodeController");
const router = express.Router();

router.get("/", getQRCode);
router.post("/", makeQRCode);

module.exports = router;