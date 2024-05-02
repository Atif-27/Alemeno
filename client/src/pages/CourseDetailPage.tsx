import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchCourseById } from "../store/course";
// import CourseDetailCard from "./CourseDetailCard";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  console.log(courseId);

  const dispatch = useAppDispatch();
  const courseDetail = useAppSelector((state) => state.course.courseDetail);
  console.log(courseDetail);

  useEffect(() => {
    dispatch(fetchCourseById(Number(courseId)));
  }, [courseId, dispatch]);

  return (
    <section>
      <header className=" bg-cyan-50  max-h-[20rem]">
        <div className=" py-20 px-40 max-md:px-10 flex justify-between gap-10     ">
          <div>
            <h2 className="text-5xl font-bold">{courseDetail?.name}</h2>
            <p>{courseDetail?.description}</p>
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>
          <div className="card w-96  shadow-xl bg-gray-400 text-black max-md:hidden">
            {/* <CourseDetailCard /> */}
          </div>
        </div>
      </header>
      <div className="card rounded-none   shadow-xl bg-gray-400 text-black md:hidden max-w-md mx-auto my-10">
        {/* <CourseDetailCard /> */}
      </div>

      <main className="py-20 px-40 max-md:px-10 ">
        <div>
          <h3>Instructor: {courseDetail?.instructor}</h3>
          <p>Duration: {courseDetail?.duration} weeks</p>
          <p>Schedule: {courseDetail?.schedule}</p>
          <p>Location: {courseDetail?.location}</p>
          <p>Prerequisites: {courseDetail?.prerequisites.join(", ")}</p>
        </div>
        <div>
          <h3 className="text-4xl text-bold">Instructor</h3>
        </div>
        {/* ! Syllabus */}
        <div className="max-w-3xl ">
          <h3>Syllabus</h3>
          <div className="join join-vertical w-full   text-white ">
            {courseDetail?.syllabus.map((item) => (
              <div className="collapse collapse-arrow join-item border border-gray-400">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  {item.topic}
                </div>
                <div className="collapse-content">
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default CourseDetailPage;
