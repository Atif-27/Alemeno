// index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const Likes = require("./models/Likes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

require("dotenv").config();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust based on your front-end URL
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8080;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// index.js
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("requestInitialLikes", async ({ courseId, userId }) => {
    try {
      const likes = await Likes.findOne({ course: courseId });
      const isLiked = likes ? likes.usersLiked.includes(userId) : false;
      const count = likes ? likes.usersLiked.length : 0;

      socket.emit("initialLikesData", {
        courseId,
        isLiked,
        count,
      });
    } catch (error) {
      console.error("Error retrieving initial likes data:", error);
      socket.emit("error", "Error retrieving initial likes data");
    }
  });

  socket.on("toggleLike", async ({ courseId, userId }) => {
    try {
      const likes = await Likes.findOne({ course: courseId });
      let updatedLikes;
      if (!likes) {
        updatedLikes = new Likes({ course: courseId, usersLiked: [userId] });
      } else {
        const index = likes.usersLiked.indexOf(userId);
        if (index === -1) {
          likes.usersLiked.push(userId);
        } else {
          likes.usersLiked.splice(index, 1);
        }
        updatedLikes = await likes.save();
      }
      io.emit("likesUpdated", {
        courseId: courseId,
        usersLiked: updatedLikes.usersLiked,
        count: updatedLikes.usersLiked.length,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      socket.emit("error", "Error toggling like");
    }
  });
});
