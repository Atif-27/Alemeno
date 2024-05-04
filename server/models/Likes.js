// models/Likes.js
const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;
