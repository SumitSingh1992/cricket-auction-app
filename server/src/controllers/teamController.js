const Team = require("../models/Team");

const cloudinary = require("../config/cloudinary");

const createTeam = async (req, res) => {
  try {
    const { teamName, ownerName, tournament, purseRemaining } = req.body;

    let teamLogo = "";

    if (req.file) {
      const base64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const uploadedImage = await cloudinary.uploader.upload(base64, {
        folder: "teams",
      });

      teamLogo = uploadedImage.secure_url;
    }

    const team = await Team.create({
      teamName,
      ownerName,
      tournament,
      purseRemaining,
      teamLogo,
    });

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("tournament").populate("players");

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTeam,
  getTeams,
};
