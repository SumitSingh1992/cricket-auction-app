const Player = require("../models/Players");
const cloudinary = require("../config/cloudinary");

const registerPlayer = async (req, res) => {
  try {
    const existingPlayer = await Player.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (existingPlayer) {
      return res.status(409).json({
        success: false,
        message: "Player already registered with this mobile number",
      });
    }
    let imageUrl = "";

    if (req.file) {
      const base64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const uploadedImage = await cloudinary.uploader.upload(base64, {
        folder: "players",
      });

      imageUrl = uploadedImage.secure_url;
    }

    const player = await Player.create({
      ...req.body,

      profilePhoto: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Player registered successfully",
      data: player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerPlayer,
  getPlayers,
};
