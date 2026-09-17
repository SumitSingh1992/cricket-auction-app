const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    tournamentName: {
      type: String,
      required: true,
    },

    ballType: {
      type: String,
      enum: ["Leather", "Tennis"],
      required: true,
    },

    overs: {
      type: Number,
      required: true,
    },

    powerplayOvers: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    grounds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ground",
      },
    ],

    bannerImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tournament", tournamentSchema);
