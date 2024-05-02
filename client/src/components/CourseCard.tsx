import { FaCalendarCheck } from "react-icons/fa";
import { IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CourseType } from "../types/courseType";

const CourseCard = ({ course }: { course: CourseType }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-md md:max-w-full md:max-h-64 border border-gray-200 border-opacity-20  ">
      <figure className=" md:max-w-[45%] max-md:w-full max-md:max-h-[20%]">
        <img
          src={course.thumbnail}
          alt="Album"
          className="w-full h-full  object-center "
        />
      </figure>
      <div className="card-body">
        <div className="flex gap-2">
          By <p className=" font-bold">{course.instructor}</p>
        </div>

        <h2 className="card-title font-bold">{course.name}</h2>
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
          <Link to={`/courses/${course.id}`}>
            <button className="btn btn-primary">View Course</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
