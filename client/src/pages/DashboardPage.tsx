import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchEnrolledCourses } from "../store/course";
import { GiHamburgerMenu } from "react-icons/gi";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);
  return (
    <section className="bg-primary_gray flex  min-h-screen">
      <div
        className={`bg-primary_gray_light border-r  border-gray-600 w-60 flex flex-col justify-start py-8 px-4
        max-md:hidden
       max-h-screen sticky inset-0`}
      >
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="hidden max-md:flex bg-neutral px-4 py-6">
          <div className="drawer ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                <GiHamburgerMenu size={20} />
              </label>
            </div>
            <div className="drawer-side z-20 h-screen">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
        <div className=" p-12 max-md:p-7">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
