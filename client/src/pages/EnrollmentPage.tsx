import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { markAllAsCompleted, updateProgress } from "../store/course";
import { percentageCal } from "../utils/percentageCal";
import { ProgressItem } from "../types/courseType";
import InstructorCard from "../components/InstructorCard";
import PageHeading from "../components/PageHeading";
import LoadingPage from "./LoadingPage";

const EnrollmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const eCourse = useAppSelector((state) => state.course);
  const error = eCourse.error;
  const enrollCourse = eCourse.enrolledCourses;
  const isLoading = eCourse.status === "loading";
  const course = enrollCourse.find(
    (course) => String(course.course._id) === id
  );
  const currentCourse = course?.course;
  const progress = course?.progress;
  const percentage = percentageCal(progress as ProgressItem[]);

  function handleComplete(id: number) {
    dispatch(
      updateProgress({
        courseId: currentCourse?._id as string,
        week: id,
        completed: true,
      })
    );
  }
  function handleCourseComplete() {
    dispatch(markAllAsCompleted(currentCourse?._id as string));
  }
  if (isLoading) return <LoadingPage />;
  if (error || !currentCourse?._id) navigate("/something-went-wrong");

  return (
    <div>
      <header>
        <PageHeading
          title={currentCourse?.title as string}
          className="text-primary"
        />
        <img
          src={currentCourse?.thumbnail}
          alt="thumbnail"
          className="max-w-2xl max-md:max-w-md aspect-video my-6 "
        />
        <p>{currentCourse?.description}</p>
        <InstructorCard
          avatar={currentCourse?.instructor.avatar as string}
          name={currentCourse?.instructor.name as string}
          title={currentCourse?.instructor.title as string}
          bio={currentCourse?.instructor.bio as string}
        />
      </header>

      {/* Progresss */}
      <h2 className="text-4xl font-semibold">Course Progress</h2>
      <div className="flex max-md:flex-col gap-10  items-center my-8">
        <div
          className="radial-progress text-primary bg-black bg-opacity-40"
          style={
            { "--value": percentage, "--size": "12rem" } as React.CSSProperties
          }
          role="progressbar"
        >
          {percentage}%
        </div>

        {percentage !== 100 ? (
          <button className="btn btn-accent" onClick={handleCourseComplete}>
            Mark Course as complete
          </button>
        ) : (
          <div className="text-xl font-semibold">
            Congratulations You have completed the course!
          </div>
        )}
      </div>

      {/* Syllabus and progress */}
      <section className="max-w-4xl max-lg:max-w-2xl max-md:max-w-md w-auto">
        {currentCourse?.syllabus.map((item, index) => (
          <div
            className="collapse collapse-arrow join-item border border-gray-400"
            key={item.week}
          >
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium flex gap-4 items-center">
              {item.topic}
              {progress![index].completed && (
                <div className="badge badge-accent">completed</div>
              )}
            </div>
            <div className="collapse-content flex flex-col ">
              <p>{item.content}</p>
              {!progress![index].completed && (
                <button
                  className="btn btn-info my-4 w-40 self-end"
                  onClick={() => handleComplete(item.week)}
                >
                  Mark as complete
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EnrollmentPage;
