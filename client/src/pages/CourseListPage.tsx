import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchCourses } from "../store/course";
import CourseFilter from "../components/CourseFilter";
import CourseContainer from "../components/CourseContainer";
import LoadingPage from "./LoadingPage";

const CoursListPage = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course);
  const isLoading = courses.status === "loading";
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  if (isLoading) return <LoadingPage />;
  return (
    <section className="">
      <CourseFilter>
        <CourseContainer courses={courses.courses} />
      </CourseFilter>
    </section>
  );
};

export default CoursListPage;
