const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  createAdmin,
  getAdmins,
} = require("../controllers/adminController");

const { protect, superAdminOnly } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);

router.post("/create", protect, superAdminOnly, createAdmin);

router.get("/all", protect, superAdminOnly, getAdmins);

module.exports = router;
