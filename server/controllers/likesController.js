const Likes = require("../models/Likes");

// Toggle like for a course
exports.toggleLike = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  try {
    let likes = await Likes.findOne({ course: courseId });
    if (!likes) {
      likes = new Likes({ course: courseId, usersLiked: [userId] });
    } else {
      const index = likes.usersLiked.indexOf(userId);
      if (index > -1) {
        likes.usersLiked.splice(index, 1);
      } else {
        likes.usersLiked.push(userId);
      }
    }
    await likes.save();
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
