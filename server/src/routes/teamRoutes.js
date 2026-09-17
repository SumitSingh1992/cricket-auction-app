const express = require("express");

const router = express.Router();

const { createTeam, getTeams } = require("../controllers/teamController");

const upload = require("../middleware/uploadMiddleware");

router.post("/create", upload.single("teamLogo"), createTeam);

router.get("/", getTeams);

module.exports = router;
