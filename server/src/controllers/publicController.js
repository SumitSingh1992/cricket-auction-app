const Auction = require("../models/Auction");

const getCurrentLiveAuction = async (req, res) => {
  try {
    const auction = await Auction.findOne({
      status: "Live",
    });

    if (!auction) {
      return res.status(200).json({
        success: true,
        live: false,
      });
    }

    res.status(200).json({
      success: true,
      live: true,
      auctionId: auction._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCurrentLiveAuction,
};
