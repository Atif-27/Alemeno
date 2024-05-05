import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchCourseById } from "../store/course";
import CourseDetailCard from "../components/CourseDetailCard";
import InstructorCard from "../components/InstructorCard";
import PageHeading from "../components/PageHeading";
import SectionHeading from "../components/SectionHeading";
import { MdSlowMotionVideo } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import LoadingPage from "./LoadingPage";

/*
+ CourseDetailPage is a component that displays the course details.
+ The component uses the useParams hook to get the courseId from the URL.
+ The component dispatches the fetchCourseById action to get the course details.
*/

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const course = useAppSelector((state) => state.course);
  const courseDetail = course.selectedCourse;
  const isLoading = course.status === "loading";
  const error = course.error;
  useEffect(() => {
    dispatch(fetchCourseById(courseId as string)); // Fetch course details by courseId
  }, [courseId, dispatch]);
  if (isLoading) return <LoadingPage />;
  if (error) navigate("/something-went-wrong");
  return (
    <section>
      <header className=" bg-slate-700 lg:max-h-[23rem]   md:max-h-[25rem] max-md:h-full">
        <div className=" py-20 max-xl:px-10 px-40 max-md:px-10 flex justify-between gap-10     ">
          <div>
            <PageHeading
              title={courseDetail?.title as string}
              className="text-white"
            />
            <p className="max-w-3xl max-md:text-md text-xl mt-8">
              {courseDetail?.description}
            </p>
            <div className="flex gap-4 items-center mt-8 max-md:mt-4">
              <div className="flex gap-4 items-center max-md:flex-col  max-md:items-start text-white  opacity-90">
                <div className="rating">
                  {Array.from({ length: 5 }, () => 2).map((_, index) => (
                    <input
                      type="radio"
                      name={courseDetail?._id}
                      className="mask mask-star-2 bg-orange-400"
                      key={index}
                      checked={index === Number(courseDetail?.rating) - 1} // Set checked if index is less than or equal to course rating minus 1
                    />
                  ))}
                </div>
                <p className="text-xl">
                  Last Updated:{" "}
                  {courseDetail?.updatedAt
                    ? new Date(courseDetail.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-xl">
                  Enrolled: {courseDetail?.students} Students
                </p>
              </div>
            </div>
          </div>
          <div className=" w-96 sticky top-0 left-0  shadow-xl bg-neutral text-white max-md:hidden">
            <CourseDetailCard
              avatar={courseDetail?.thumbnail as string}
              price={courseDetail?.price as number}
              enrollmentStatus={courseDetail?.enrollmentStatus as string}
            />
          </div>
        </div>
      </header>
      <div className="card rounded-none   shadow-xl bg-neutral text-white md:hidden max-w-md mx-auto my-10">
        <CourseDetailCard
          avatar={courseDetail?.thumbnail as string}
          price={courseDetail?.price as number}
          enrollmentStatus={courseDetail?.enrollmentStatus as string}
        />
      </div>

      <main className="py-20 max-xl:px-10 px-40 max-md:px-4  ">
        <div>
          <InstructorCard
            avatar={courseDetail?.instructor.avatar as string}
            name={courseDetail?.instructor.name as string}
            title={courseDetail?.instructor.title as string}
            bio={courseDetail?.instructor.bio as string}
          />
          <div>
            <div className="card max-w-4xl   bg-neutral text-neutral-content my-10">
              <div className="card-body px-10 py-7 ">
                <SectionHeading title="Course Details" />
                <div className="flex gap-4 items-center mt-3">
                  <div className="flex flex-col gap-2 items-start">
                    <p className="text-xl">
                      Duration: {courseDetail?.duration}{" "}
                    </p>
                    <p className="text-xl">
                      Schedule: {courseDetail?.schedule}
                    </p>
                    <p className="text-xl">
                      Location: {courseDetail?.location}
                    </p>
                    <p className="text-xl">Prerequisites:</p>
                    <div className="flex flex-wrap gap-4">
                      {courseDetail?.prerequisites.map((item) => (
                        <div className="badge px-6 py-5  max-md:p-3 text-lg max-md:text-xs ">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ! Syllabus */}

        <div className="max-w-3xl ">
          <SectionHeading title="Syllabus" className="mb-4 mt-16" />
          <p className="text-xl mb-4">
            {courseDetail?.syllabus.length} Sections
          </p>
          <div className="join join-vertical w-full bg-neutral   ">
            {courseDetail?.syllabus.map((item) => (
              <div className="collapse collapse-arrow join-item border border-gray-600 rounded-3xl">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title text-xl font-medium flex gap-4 items-center text-white ">
                  <IoBookOutline />

                  {item.topic}
                </div>
                <div className="collapse-content flex gap-4 items-center text-lg ">
                  <MdSlowMotionVideo />

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
