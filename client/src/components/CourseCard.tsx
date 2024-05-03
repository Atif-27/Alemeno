import { FaCalendarCheck } from "react-icons/fa";
import { IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Course } from "../types/courseType";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-md md:max-w-full md:max-h-64 border border-gray-200 border-opacity-20   ">
      <figure className=" md:max-w-[45%] max-md:w-full max-md:max-h-[20%]">
        <img
          src={course.thumbnail}
          alt="Album"
          className="w-full h-full  object-center "
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title font-bold">{course.title}</h2>
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="avatar">
            <div className="w-7 rounded-full">
              <img src={course.instructor.avatar} alt="Instructor" />
            </div>
          </div>
          By <p className=" font-bold">{course.instructor.name}</p>
        </div>
        <div>
          <p className="text-sm">{course.description}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-sm flex gap-2 items-center">
            <IoTimeSharp />
            {course.duration}
            Hours
          </div>
          <div className="text-sm flex gap-2 items-center">
            <IoLocationSharp />

            {course.location}
          </div>
          <div className="text-sm flex gap-2 items-center">
            <FaCalendarCheck />
            {course.syllabus.length}{" "}
            {course.syllabus.length > 1 ? "weeks" : "week"}
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/courses/${course._id}`}>
            <button className="btn btn-primary">View Course</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
