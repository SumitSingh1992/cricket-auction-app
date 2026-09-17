const LiveAuction = require("../models/LiveAuction");

const Auction = require("../models/Auction");

const Team = require("../models/Team");

const getNextIncrement = require("../utils/getNextIncrement");

const startPlayerAuction = async (req, res) => {
  try {
    const { auctionId, playerId } = req.body;

    let liveAuction = await LiveAuction.findOne({
      auction: auctionId,
    });

    if (!liveAuction) {
      liveAuction = await LiveAuction.create({
        auction: auctionId,
      });
    }

    liveAuction.currentPlayer = playerId;

    liveAuction.currentBid = 0;

    liveAuction.currentBidTeam = null;

    liveAuction.status = "Live";

    await liveAuction.save();
    await Auction.findByIdAndUpdate(auctionId, {
      status: "Live",
    });

    const populated = await LiveAuction.findById(liveAuction._id)
      .populate("currentPlayer")
      .populate("currentBidTeam")
      .populate("lastSoldPlayer")
      .populate("lastSoldTeam")
      .populate({
        path: "auction",
        populate: {
          path: "teams",
        },
      });

    res.status(200).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const placeBid = async (req, res) => {
  try {
    const { auctionId, teamId } = req.body;

    const liveAuction = await LiveAuction.findOne({
      auction: auctionId,
    });

    const auction = await Auction.findById(auctionId);

    const team = await Team.findById(teamId);

    const increment = getNextIncrement(
      liveAuction.currentBid,
      auction.bidRules,
    );
    const nextBid = liveAuction.currentBid + increment;

    // CHECK PURSE
    if (nextBid > team.purseRemaining) {
      return res.status(400).json({
        success: false,
        message: "Insufficient purse",
      });
    }

    liveAuction.currentBid = nextBid;

    liveAuction.currentBidTeam = teamId;

    await liveAuction.save();

    const populated = await LiveAuction.findById(liveAuction._id)
      .populate("currentPlayer")
      .populate("currentBidTeam")
      .populate("lastSoldPlayer")
      .populate("lastSoldTeam")
      .populate({
        path: "auction",
        populate: {
          path: "teams",
        },
      });

    res.status(200).json({
      success: true,
      data: populated,
      increment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const decrementBid = async (req, res) => {
  try {
    const { auctionId } = req.body;

    const liveAuction = await LiveAuction.findOne({
      auction: auctionId,
    });

    const auction = await Auction.findById(auctionId);

    const increment = getNextIncrement(
      liveAuction.currentBid,
      auction.bidRules,
    );

    let updatedBid = liveAuction.currentBid - increment;

    if (updatedBid < 0) {
      updatedBid = 0;
    }

    liveAuction.currentBid = updatedBid;

    if (updatedBid === 0) {
      liveAuction.currentBidTeam = null;
    }

    await liveAuction.save();

    const populated = await LiveAuction.findById(liveAuction._id)
      .populate("currentPlayer")
      .populate("currentBidTeam")
      .populate("lastSoldPlayer")
      .populate("lastSoldTeam")
      .populate({
        path: "auction",
        populate: {
          path: "teams",
        },
      });

    res.status(200).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sellPlayer = async (req, res) => {
  try {
    const { auctionId } = req.body;

    const liveAuction = await LiveAuction.findOne({
      auction: auctionId,
    });

    // VALIDATION
    if (!liveAuction?.currentPlayer) {
      return res.status(400).json({
        success: false,
        message: "No active player in auction",
      });
    }

    if (!liveAuction?.currentBidTeam) {
      return res.status(400).json({
        success: false,
        message: "No team has bid yet",
      });
    }

    const team = await Team.findById(liveAuction.currentBidTeam);

    // ADD PLAYER TO TEAM
    team.players.push(liveAuction.currentPlayer);

    // DEDUCT PURSE
    team.purseRemaining -= liveAuction.currentBid;

    await team.save();

    // STORE SOLD PLAYER
    liveAuction.soldPlayers.push({
      player: liveAuction.currentPlayer,

      team: liveAuction.currentBidTeam,

      amount: liveAuction.currentBid,
    });

    liveAuction.lastSoldPlayer = liveAuction.currentPlayer;

    liveAuction.lastSoldTeam = liveAuction.currentBidTeam;

    liveAuction.lastSoldAmount = liveAuction.currentBid;

    liveAuction.lastAuctionStatus = "SOLD";

    // RESET CURRENT AUCTION
    liveAuction.currentPlayer = null;

    liveAuction.currentBid = 0;

    liveAuction.currentBidTeam = null;

    await liveAuction.save();

    // RETURN UPDATED LIVE AUCTION
    const populated = await LiveAuction.findById(liveAuction._id)
      .populate("currentPlayer")
      .populate("currentBidTeam")
      .populate("lastSoldPlayer")
      .populate("lastSoldTeam")
      .populate({
        path: "auction",
        populate: {
          path: "teams",
        },
      });

    res.status(200).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unsoldPlayer = async (req, res) => {
  try {
    const { auctionId } = req.body;

    const liveAuction = await LiveAuction.findOne({
      auction: auctionId,
    });

    // VALIDATION
    if (!liveAuction?.currentPlayer) {
      return res.status(400).json({
        success: false,
        message: "No active player in auction",
      });
    }

    // STORE UNSOLD PLAYER
    liveAuction.unsoldPlayers.push(liveAuction.currentPlayer);

    liveAuction.lastSoldPlayer = liveAuction.currentPlayer;

    liveAuction.lastSoldTeam = null;

    liveAuction.lastSoldAmount = 0;

    liveAuction.lastAuctionStatus = "UNSOLD";

    // RESET CURRENT PLAYER
    liveAuction.currentPlayer = null;

    liveAuction.currentBid = 0;

    liveAuction.currentBidTeam = null;

    await liveAuction.save();

    // RETURN UPDATED LIVE AUCTION
    const populated = await LiveAuction.findById(liveAuction._id)
      .populate("currentPlayer")
      .populate("currentBidTeam")
      .populate("lastSoldPlayer")
      .populate("lastSoldTeam")
      .populate({
        path: "auction",
        populate: {
          path: "teams",
        },
      });

    res.status(200).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const endAuction = async (req, res) => {
  try {
    const { auctionId } = req.body;

    // UPDATE AUCTION STATUS
    await Auction.findByIdAndUpdate(auctionId, {
      status: "Completed",
    });

    // OPTIONAL:
    // reset current player
    const liveAuction = await LiveAuction.findOne({
      auction: auctionId,
    });

    if (liveAuction) {
      liveAuction.currentPlayer = null;

      liveAuction.currentBid = 0;

      liveAuction.currentBidTeam = null;

      liveAuction.status = "Completed";

      await liveAuction.save();
    }

    res.status(200).json({
      success: true,
      message: "Auction ended successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLiveAuction = async (req, res) => {
  try {
    const liveAuction = await LiveAuction.findOne({
      auction: req.params.auctionId,
    })
      .populate("currentPlayer")
      .populate("currentBidTeam")
      .populate("lastSoldPlayer")
      .populate("lastSoldTeam")
      .populate({
        path: "auction",
        populate: {
          path: "teams",
        },
      });

    res.status(200).json({
      success: true,
      data: liveAuction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  startPlayerAuction,
  placeBid,
  decrementBid,
  sellPlayer,
  unsoldPlayer,
  endAuction,
  getLiveAuction,
};
