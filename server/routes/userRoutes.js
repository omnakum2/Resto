const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
  register,
  login,
  staffuser,
} = require("../controllers/userController");
const { authenticateJWT, authorizeRole } = require("../middleware/auth");

// public routes
router.post("/register", register);
router.post("/login", login);

// admin routes
router.get("/admin", authenticateJWT, authorizeRole("admin"), getAllUsers);
router.get("/admin/:id", authenticateJWT, authorizeRole("admin"), getUser);
router.put("/admin/:id", authenticateJWT, authorizeRole("admin"), editUser);
router.delete("/admin/:id", authenticateJWT, authorizeRole("admin"), deleteUser);

// Staff routes
router.get("/staff", authenticateJWT, authorizeRole(["admin","staff"]), staffuser)

module.exports = router;
