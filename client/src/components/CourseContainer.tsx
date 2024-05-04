import { useSearchParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { Course } from "../types/courseType";
import { useAppSelector } from "../hooks/reduxHooks";
import NotFound from "../assets/NotFound.jpg";
import CourseCardSkeleton from "../skeleton/CourseCardSkeleton";

const CourseContainer = ({
  courses,
}: {
  courses: Course[];
  enrolled?: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const [editedCourses, setEditedCourses] = useState<Course[]>([]);
  const sort = searchParams.get("sort");
  const query = searchParams.get("q");
  const rating = searchParams.get("rating");
  const status = useAppSelector((state) => state.course.status);
  const isLoading = status === "loading";
  console.log(editedCourses);

  useEffect(() => {
    let filteredCourses = [...courses];

    // Filter courses based on search query -> Name and Instructor name
    if (query) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort courses based on sort query
    switch (sort) {
      case "rating":
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filteredCourses.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "low-to-high":
        filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        filteredCourses.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    switch (rating) {
      case "5star":
        filteredCourses = filteredCourses.filter(
          (course) => course.rating === 5
        );
        break;
      case "4star":
        filteredCourses = filteredCourses.filter(
          (course) => course.rating === 4
        );
        break;
      case "3star":
        filteredCourses = filteredCourses.filter(
          (course) => course.rating === 3
        );
        break;
      case "2star":
        filteredCourses = filteredCourses.filter(
          (course) => course.rating === 2
        );
        break;
      case "1star":
        filteredCourses = filteredCourses.filter(
          (course) => course.rating === 1
        );
        break;
    }

    setEditedCourses(filteredCourses);
  }, [sort, query, courses, rating]); // Include `courses` to ensure the effect runs when courses change.
  if (isLoading || editedCourses.length) {
    return (
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <CourseCardSkeleton />
        ) : (
          editedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        )}
      </div>
    );
  }
  if (!editedCourses.length && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        No courses found
        <img
          src={NotFound}
          alt="No courses found"
          className="w-96 h-96 mx-auto"
        />
      </div>
    );
  }
};

export default CourseContainer;
