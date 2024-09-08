const express = require("express");
const multer = require("multer");
const path = require("path");
const { profileStaff } = require("../controllers/profileController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/profile",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.put("/:id", upload.single("image"), profileStaff);

module.exports = router;
