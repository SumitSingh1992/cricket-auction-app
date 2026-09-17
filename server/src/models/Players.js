const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["All Rounder", "Batter", "Bowler", "Batter + Keeper"],
    },

    battingStyle: {
      type: String,
      required: true,
      enum: ["Right Hand Bat", "Left Hand Bat"],
    },

    bowlingStyle: {
      type: String,
      required: true,
      enum: [
        "None",
        "Right Arm Medium",
        "Left Arm Medium",
        "Right Arm Spinner",
        "Left Arm Spinner",
      ],
    },

    cricheroesProfile: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS"],
      default: "PENDING",
    },

    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Player", playerSchema);
