import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchCourses } from "../store/course";

const CoursListPage = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course);
  console.log(courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  return <div></div>;
};

export default CoursListPage;
