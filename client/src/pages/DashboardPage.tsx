import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchEnrolledCourses } from "../store/course";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);
  return (
    <section className="bg-primary_gray flex  min-h-screen   ">
      <div
        className={`bg-primary_gray_light border-r  border-gray-600 w-60 flex flex-col justify-start py-8 px-4
        max-md:hidden
       max-h-screen sticky inset-0`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 p-12 max-md:p-7">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardPage;
