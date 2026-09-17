const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema(
  {
    groundName: {
      type: String,
      required: true,
    },

    photos: [
      {
        type: String,
      },
    ],

    contactName: {
      type: String,
      required: true,
    },

    contactMobile: {
      type: String,
      required: true,
    },

    ownerManager: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    googleMapsLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Ground", groundSchema);
