const CourseCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="card lg:card-side  shadow-md md:max-w-full min-h-64   border border-gray-200 border-opacity-20 skeleton   "
        ></div>
      ))}
    </div>
  );
};

export default CourseCardSkeleton;
