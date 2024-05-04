const express = require("express");
const { toggleLike } = require("../controllers/likesController");
const router = express.Router();

router.post("/likes/toggle", toggleLike);

module.exports = router;
