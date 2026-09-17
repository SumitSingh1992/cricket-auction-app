const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],

    currentBid: {
      type: Number,
      default: 0,
    },
    bidRules: [
      {
        threshold: Number,
        incrementBy: Number,
      },
    ],
    currentBidTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Auction", auctionSchema);
