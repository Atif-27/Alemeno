"use client";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { MdDataUsage } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

import { SiGoogledocs } from "react-icons/si";
import { FaTent } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";

const Sidebar = ({ type }: { type?: string }) => {
  return (
    <>
      <Link to={"/"} className="flex gap-4 items-center">
        <div className=" bg-brand p-2 rounded-full">
          <IoArrowBackOutline size={20} className="text-white" />
        </div>
        <div className="text-[#fff] text-lg">Back to Alemeno</div>
      </Link>
      <ul className="mt-12 flex-1 w-full space-y-3 text-lg">
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
        <SidebarButton
          type={type}
          current={"/dashboard/settings"}
          logo={<IoSettings />}
        >
          Settings
        </SidebarButton>
      </ul>
      <div className="space-y-3 w-full  "></div>
    </>
  );
};

export default Sidebar;
