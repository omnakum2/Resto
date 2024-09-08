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
  resetPassword,
  forgotPassword,
  changePassword,
} = require("../controllers/userController");
const { authenticateJWT, authorizeRole } = require("../middleware/auth");

// public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

// admin routes
router.get("/admin", authenticateJWT, authorizeRole("admin"), getAllUsers);
router.put("/admin/:id", authenticateJWT, authorizeRole("admin"), editUser);

router.get("/staff", authenticateJWT, authorizeRole("admin"), getAllStaff);
router.get("/profile/:id", authenticateJWT, authorizeRole(["admin","staff"]), getUser);
router.post("/reset-password", authenticateJWT, authorizeRole(["admin","staff"]), resetPassword);

router.patch("/staff/:id", authenticateJWT, authorizeRole("admin"), toggleStatus);
router.delete("/staff/:id", authenticateJWT, authorizeRole("admin"), deleteUser); 

module.exports = router;
