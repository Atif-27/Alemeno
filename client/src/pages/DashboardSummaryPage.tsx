import PageHeading from "../components/PageHeading";
import { useAppSelector } from "../hooks/reduxHooks";
import LoadingPage from "./LoadingPage";

const DashboardSummaryPage = () => {
  const course = useAppSelector((state) => state.course);
  const enrolled = course.enrolledCourses;
  const isLoading = course.status === "loading";
  const totalCourses = enrolled.length;
  const totalWorth = enrolled.reduce((acc, course) => {
    return acc + course.course.price;
  }, 0);

  const totalSectionCompleted = enrolled.reduce((acc, course) => {
    return acc + course.progress.filter((item) => item.completed).length;
  }, 0);
  const totalSections = enrolled.reduce((acc, course) => {
    return acc + course.course.syllabus.length;
  }, 0);
  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <PageHeading title="Dashboard" className="text-primary" />
      <div className="stats max-md:grid-rows-3  shadow  bg-neutral mt-10 w-auto ">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Courses Taken</div>
          <div className="stat-value text-primary">{totalCourses}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Money Spent</div>
          <div className="stat-value text-secondary">{totalWorth} $</div>
        </div>

        <div className="stat w-full ">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div className="stat-value">
            {(totalSectionCompleted / totalSections) * 100}%
          </div>
          <div className="stat-title">Weeks done</div>
          <div className="stat-desc text-secondary">
            {totalSections - totalSectionCompleted} Weeks remaining
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryPage;
