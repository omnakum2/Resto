const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  getFoods,
  getFood,
  addFood,
  updateFood,
  deleteFood,
  toggleStatus,
  toggleSpecial,
  byCategory,
} = require("../controllers/foodController");

const storage = multer.diskStorage({
  destination: "./uploads",
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

router.get("/", getFoods);
router.get("/:id", getFood);
router.post("/", upload.single("image"), addFood);
router.put("/:id", upload.single("image"), updateFood);
router.patch("/:id", toggleStatus);
router.patch("/flag/:id", toggleSpecial);
router.delete("/:id", deleteFood);
router.post("/:category_id", byCategory);

module.exports = router;
