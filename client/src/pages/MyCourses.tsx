import { CourseCard } from "../components/CourseCard";
import NotFound from "../components/NotFound";
import PageHeading from "../components/PageHeading";
import { useAppSelector } from "../hooks/reduxHooks";
import { Course, ProgressItem } from "../types/courseType";
import { percentageCal } from "../utils/percentageCal";
import LoadingPage from "./LoadingPage";

const MyCourses = () => {
  const { enrolledCourses: course, status } = useAppSelector(
    (state) => state.course
  );
  const progress = course.map((course) => course.progress);
  const courses = course.map((course) => course.course);
  const isLoading = status === "loading";
  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <PageHeading title="My Courses" className="text-primary" />
      <div className="gap-4 flex flex-col mt-10 max-w-6xl">
        {!isLoading && !courses.length && <NotFound />}
        {!isLoading &&
          courses.map((course: Course, index) => {
            const percentage = percentageCal(progress[index] as ProgressItem[]);

            return (
              <div key={course._id}>
                <CourseCard
                  course={course}
                  enrolled={{
                    value: true,
                    progress: percentage as number,
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
