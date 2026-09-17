const Auction = require("../models/Auction");

const createAuction = async (req, res) => {
  try {
    const { tournament, teams, players, bidRules } = req.body;

    const auction = await Auction.create({
      tournament,
      teams,
      players,
      bidRules,
    });

    res.status(201).json({
      success: true,
      data: auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate("tournament")
      .populate("teams");

    res.status(200).json({
      success: true,
      data: auctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("tournament")
      .populate("teams");

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAuction,
  getAuctions,
  getAuctionById,
};
