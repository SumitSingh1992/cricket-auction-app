const express = require("express");

const router = express.Router();

const { getCurrentLiveAuction } = require("../controllers/publicController");

router.get("/live-auction", getCurrentLiveAuction);

module.exports = router;
