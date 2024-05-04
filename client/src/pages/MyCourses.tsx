import CourseCard from "../components/CourseCard";
import { useAppSelector } from "../hooks/reduxHooks";
import { Course, ProgressItem } from "../types/courseType";
import { percentageCal } from "../utils/percentageCal";

const MyCourses = () => {
  const { enrolledCourses: course, status } = useAppSelector(
    (state) => state.course
  );
  const progress = course.map((course) => course.progress);
  const courses = course.map((course) => course.course);
  const isLoading = status === "loading";
  return (
    <div>
      <h1 className="text-5xl font-bold">My Courses</h1>
      <div className="gap-4 flex flex-col mt-10 max-w-6xl">
        {!isLoading &&
          courses.map((course: Course, index) => {
            const percentage = percentageCal(progress[index] as ProgressItem[]);

            return (
              <div key={course._id}>
                <CourseCard
                  course={course}
                  enrolled={{
                    value: true,
                    progress: percentage,
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyCourses;
