const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
  register,
  login,
  getAllStaff,
  toggleStatus,
} = require("../controllers/userController");
const { authenticateJWT, authorizeRole } = require("../middleware/auth");

// public routes
router.post("/register", register);
router.post("/login", login);

// admin routes
router.get("/admin", authenticateJWT, authorizeRole("admin"), getAllUsers);
router.put("/admin/:id", authenticateJWT, authorizeRole("admin"), editUser);

router.get("/staff", authenticateJWT, authorizeRole("admin"), getAllStaff);
router.get("/staff/:id", authenticateJWT, authorizeRole(["admin","staff"]), getUser);
router.patch("/staff/:id", authenticateJWT, authorizeRole("admin"), toggleStatus);
router.delete("/staff/:id", authenticateJWT, authorizeRole("admin"), deleteUser);

module.exports = router;
