import { useSearchParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Key, useEffect, useState } from "react";
import { CourseType } from "../types/courseType";

const CourseContainer = ({ courses }: { courses: CourseType[] }) => {
  const [searchParams] = useSearchParams();
  const [editedCourses, setEditedCourses] = useState(courses);
  const sort = searchParams.get("sort");
  const query = searchParams.get("q");
  useEffect(() => {
    if (query) {
      setEditedCourses(
        courses.filter(
          (course) =>
            course.name.toLowerCase().includes(query.toLowerCase()) ||
            course.instructor.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    if (sort === "rating") {
      setEditedCourses((courses) =>
        [...courses].sort((a, b) => b.rating - a.rating)
      );
    }
    if (sort === "newsest") {
      setEditedCourses((courses) =>
        [...courses].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
    if (sort === "low-to-high") {
      setEditedCourses((courses) =>
        [...courses].sort((a, b) => a.price - b.price)
      );
    }
    if (sort === "high-to-low") {
      setEditedCourses((courses) =>
        [...courses].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, courses, query]);
  return (
    <div className="flex flex-col gap-8">
      {editedCourses.map((course: { id: Key | null | undefined }) => (
        <div key={course.id}>
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseContainer;
