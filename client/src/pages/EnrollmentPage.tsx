import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { markAllAsCompleted, updateProgress } from "../store/course";
import { percentageCal } from "../utils/percentageCal";
import { ProgressItem } from "../types/courseType";

const EnrollmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const enrollCourse = useAppSelector((state) => state.course.enrolledCourses);
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
  return (
    <div>
      <header>
        <h1 className="text-4xl font-bold">{currentCourse?.title}</h1>
        <img
          src={currentCourse?.thumbnail}
          alt="thumbnail"
          className="max-w-2xl max-md:max-w-md aspect-video my-6 "
        />
        <p>{currentCourse?.description}</p>
        <div className="card max-w-4xl   bg-neutral text-neutral-content my-10">
          <div className="card-body px-10 py-5 ">
            <h2 className="card-title text-2xl font-semibold">
              Instructor Details
            </h2>
            <div className="flex justify-start items-start gap-4 my-4">
              <img
                src={currentCourse?.instructor.avatar}
                alt="avatar"
                className="w-14 h-14 object-cover rounded-full"
              />
              <div>
                <p className="text-xl font-bold">
                  {currentCourse?.instructor.name}
                </p>
                <p className="font-semibold">
                  {currentCourse?.instructor.title}
                </p>
                <p>{currentCourse?.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progresss */}
      <h2 className="text-4xl font-semibold">Course Progress</h2>
      <div className="flex gap-10  items-center my-8">
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
          <div className="collapse collapse-arrow join-item border border-gray-400">
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
