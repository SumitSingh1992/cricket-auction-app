const express = require("express");

const router = express.Router();

const {
  createAuction,
  getAuctions,
  getAuctionById,
} = require("../controllers/auctionController");

router.post("/create", createAuction);

router.get("/", getAuctions);
router.get("/:id", getAuctionById);

module.exports = router;
