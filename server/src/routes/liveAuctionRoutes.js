const express = require("express");

const router = express.Router();

const {
  startPlayerAuction,
  placeBid,
  decrementBid,
  sellPlayer,
  unsoldPlayer,
  endAuction,
  getLiveAuction,
} = require("../controllers/liveAuctionController");

router.post("/start-player", startPlayerAuction);

router.post("/bid", placeBid);

router.post("/decrement-bid", decrementBid);

router.post("/sell", sellPlayer);

router.post("/unsold", unsoldPlayer);

router.post("/end-auction", endAuction);

router.get("/:auctionId", getLiveAuction);

module.exports = router;
