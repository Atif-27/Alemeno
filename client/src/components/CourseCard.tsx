import { FaCalendarCheck } from "react-icons/fa";
import { IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Course } from "../types/courseType";

const CourseCard = ({
  course,
  enrolled = {
    value: false,
    progress: 0,
  },
}: {
  course: Course;
  enrolled?: {
    value: boolean;
    progress: number;
  };
}) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-md md:max-w-full min-h-64   border border-gray-200 border-opacity-20   ">
      <figure className=" md:max-w-[45%] max-md:w-full max-md:max-h-[20%]">
        <img
          src={course.thumbnail}
          alt="Album"
          className="w-full h-full  object-center "
        />
      </figure>
      <div className="card-body w-full ">
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
          </div>
          <div className="text-sm flex gap-2 items-center">
            <IoLocationSharp />

            {course.location}
          </div>
          <div className="text-sm flex gap-2 items-center">
            <FaCalendarCheck />
            {course.syllabus.length}{" "}
            {course.syllabus.length > 1 ? "Sections" : "Section"}
          </div>
        </div>
        {!enrolled.value && (
          <div className="card-actions justify-end">
            <p className=" text-emerald-400 text-xl font-bold">
              {course.price} $
            </p>
            <Link to={`/courses/${course._id}`}>
              <button className="btn btn-primary">View Course</button>
            </Link>
          </div>
        )}
        {enrolled.value && (
          <section className="my-3">
            <div className="flex  gap-4  items-center">
              <progress
                className="progress progress-info w-56"
                value={enrolled.progress}
                max="100"
              ></progress>

              <p className="text-sm font-bold text-primary-500">
                {enrolled.progress} % Completed
              </p>
            </div>
            <button className="btn btn-primary mt-5">
              <Link
                to={`${course._id}`}
                className="w-full h-full flex justify-center items-center"
              >
                Resume Course
              </Link>
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
