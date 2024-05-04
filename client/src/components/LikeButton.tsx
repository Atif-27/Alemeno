import io from "socket.io-client";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const socket = io("http://localhost:8080");

export default function LikeButton({ courseId }: { courseId: string }) {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;

  useEffect(() => {
    // Request initial likes data when the component mounts
    socket.emit("requestInitialLikes", { courseId, userId });

    socket.on("initialLikesData", (data) => {
      if (data.courseId === courseId) {
        setLikesCount(data.count);
        setIsLiked(data.isLiked);
      }
    });

    socket.on("likesUpdated", (data) => {
      if (data.courseId === courseId) {
        setLikesCount(data.count);
        setIsLiked(data.usersLiked.includes(userId));
      }
    });

    return () => {
      socket.off("initialLikesData");
      socket.off("likesUpdated");
    };
  }, [courseId, userId]);

  const toggleLike = () => {
    if (!userId) {
      toast.error("Please login to like the course");
      return;
    }
    socket.emit("toggleLike", { courseId, userId });
  };

  return (
    <button
      onClick={toggleLike}
      className="flex flex-col gap-2 justify-center items-center"
    >
      {isLiked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} />}{" "}
      <span className="countdown">
        <span
          style={{ "--value": `${likesCount}` } as React.CSSProperties}
        ></span>
      </span>
    </button>
  );
}
