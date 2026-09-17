const Ground = require("../models/Ground");
const cloudinary = require("../config/cloudinary");

const createGround = async (req, res) => {
  try {
    const {
      groundName,
      contactName,
      contactMobile,
      ownerManager,
      location,
      googleMapsLink,
    } = req.body;

    let uploadedPhotos = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64",
        )}`;

        const uploadedImage = await cloudinary.uploader.upload(base64, {
          folder: "grounds",
        });

        uploadedPhotos.push(uploadedImage.secure_url);
      }
    }

    const ground = await Ground.create({
      groundName,
      photos: uploadedPhotos,
      contactName,
      contactMobile,
      ownerManager,
      location,
      googleMapsLink,
    });

    res.status(201).json({
      success: true,
      data: ground,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find();

    res.status(200).json({
      success: true,
      data: grounds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGround,
  getGrounds,
};
