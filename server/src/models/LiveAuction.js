const mongoose = require("mongoose");

const liveAuctionSchema = new mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },

    currentPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    currentBid: {
      type: Number,
      default: 0,
    },

    currentBidTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    soldPlayers: [
      {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
        },

        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },

        amount: Number,
      },
    ],

    unsoldPlayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],

    status: {
      type: String,
      enum: ["Waiting", "Live", "Completed"],
      default: "Waiting",
    },

    lastSoldPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    lastSoldTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    lastSoldAmount: {
      type: Number,
      default: 0,
    },

    lastAuctionStatus: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("LiveAuction", liveAuctionSchema);
