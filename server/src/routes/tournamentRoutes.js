const express = require("express");

const router = express.Router();

const {
  createTournament,
  getTournaments,
} = require("../controllers/tournamentController");

const upload = require("../middleware/uploadMiddleware");

router.post("/create", upload.single("bannerImage"), createTournament);

router.get("/", getTournaments);

module.exports = router;
