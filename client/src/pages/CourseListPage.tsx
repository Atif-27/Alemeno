import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchCourses } from "../store/course";
import CourseFilter from "../components/CourseFilter";
import CourseContainer from "../components/CourseContainer";

const CoursListPage = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course);
  console.log(courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  return (
    <section className="">
      <CourseFilter>
        <CourseContainer courses={courses.courses} />
      </CourseFilter>
    </section>
  );
};

export default CoursListPage;
