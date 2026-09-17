const Tournament = require("../models/Tournament");

const cloudinary = require("../config/cloudinary");

const createTournament = async (req, res) => {
  try {
    const {
      tournamentName,
      ballType,
      overs,
      powerplayOvers,
      startDate,
      endDate,
    } = req.body;

    let grounds = req.body.grounds;

    if (!Array.isArray(grounds)) {
      grounds = [grounds];
    }

    let bannerImage = "";

    if (req.file) {
      const base64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const uploadedImage = await cloudinary.uploader.upload(base64, {
        folder: "tournaments",
      });

      bannerImage = uploadedImage.secure_url;
    }

    const tournament = await Tournament.create({
      tournamentName,
      ballType,
      overs,
      powerplayOvers,
      startDate,
      endDate,
      grounds,
      bannerImage,
    });

    res.status(201).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("grounds");

    res.status(200).json({
      success: true,
      data: tournaments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTournament,
  getTournaments,
};
