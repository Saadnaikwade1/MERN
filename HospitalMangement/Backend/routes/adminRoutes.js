const express = require("express");
const {
  getPendingUsers,
  approveUser,
  getAdminStats,
  getApprovedDoctors,
  getAllUsers
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* Admin only routes */
router.get("/pending", protect, adminOnly, getPendingUsers);
router.put("/approve/:id", protect, adminOnly, approveUser);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/approved-doctors", protect, adminOnly, getApprovedDoctors);
;
module.exports = router;
 