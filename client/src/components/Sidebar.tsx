import { MdDataUsage } from "react-icons/md";
import { FaTent } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { useAppSelector } from "../hooks/reduxHooks";
import LogoutContainer from "./layout/LogoutContainer";

/*
+ Sidebar component is a reusable component that displays the sidebar navigation for the dashboard page.
*/

const Sidebar = ({ type }: { type?: string }) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userDetail);
  return (
    <>
      <Link to={"/"} className="flex gap-4 items-center">
        <div className=" bg-brand p-2 rounded-full">
          <IoArrowBackOutline size={20} className="text-white" />
        </div>
        <div className="text-[#fff] text-lg">Go back</div>
      </Link>
      <div className="flex flex-col justify-center items-center ">
        <img
          src={
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          }
          alt="avatar"
          className="w-20 h-20 rounded-full mt-5 "
        />
        <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
      </div>
      <ul className="mt-8 flex-1 w-full space-y-3 text-lg">
        <SidebarButton type={type} current={"/dashboard"} logo={<FaTent />}>
          Dashboard
        </SidebarButton>
        <SidebarButton
          type={type}
          current={"/dashboard/courses"}
          logo={<MdDataUsage />}
        >
          Your Courses
        </SidebarButton>
      </ul>
      <div className="space-y-3 w-full  ">
        <LogoutContainer>
          <div
            className="flex items-center gap-4 w-full h-full"
            onClick={() => navigate("/")}
          >
            <button className="btn btn-error w-full h-full">
              <IoArrowBackOutline size={20} />
              Logout
            </button>
          </div>
        </LogoutContainer>
      </div>
    </>
  );
};

export default Sidebar;
