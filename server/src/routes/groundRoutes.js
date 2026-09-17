const express = require("express");

const router = express.Router();

const { createGround, getGrounds } = require("../controllers/groundController");

const upload = require("../middleware/uploadMiddleware");

router.post("/create", upload.array("photos", 5), createGround);

router.get("/", getGrounds);

module.exports = router;
