const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const {
  registerPlayer,
  getPlayers,
} = require("../controllers/playerController");

router.post("/register", upload.single("profilePhoto"), registerPlayer);
router.get("/", getPlayers);

module.exports = router;
