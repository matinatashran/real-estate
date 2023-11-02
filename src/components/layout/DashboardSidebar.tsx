"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
  HiOutlineSquares2X2 as ListIcon,
  HiOutlineSquaresPlus as AddListIcon,
} from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi";
import { GoHourglass } from "react-icons/go";

// hooks
import useScreenWidth from "../../hooks/useScreenWidth";

interface IProps {
  email: string;
  role: string;
  unPublishedData: any[];
}

const DashboardSidebar: FC<IProps> = ({ email, role, unPublishedData }) => {
  const screenWidth = useScreenWidth();
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(
    screenWidth >= 756
  );

  return (
    <>
      {isShowSidebar && (
        <div className="fixed md:hidden top-0 left-0 w-full h-full z-40 bg-black opacity-30"></div>
      )}
      <div
        className={`fixed top-[70px] left-0 h-[calc(100dvh_-_140px)] mt-5 md:sticky md:top-[100px] transition-all duration-500 z-50 hover:translate-x-0 md:translate-x-0 ${
          isShowSidebar ? "max-w-[288px]" : "max-w-[55px] -translate-x-[93%]"
        }`}
      >
        <div
          onClick={() => setIsShowSidebar(!isShowSidebar)}
          className="absolute -top-1 -right-3 bg-stone-400 rounded-full cursor-pointer"
        >
          <HiChevronRight
            className={`w-6 h-6 transition duration-500 text-stone-100 ${
              isShowSidebar ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div className="w-full h-full overflow-hidden flex flex-col justify-between shadow-2xl bg-stone-100 rounded-r-2xl p-3">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3 sidebar-emailBox-style">
              <Link href="/dashboard" className="flex flex-col items-center">
                <FaUserCircle className="w-10 h-10 text-gray-300" />
                {role == "ADMIN" && (
                  <p className="text-xs text-gray-400">Admin</p>
                )}
              </Link>
              <span
                className={`text-sm max-w-[200px] line-clamp-1 transition duration-500 ${
                  isShowSidebar ? "opacity-100" : "opacity-0"
                }`}
              >
                {email}
              </span>
            </div>
            <hr className="w-full mb-3" />
            <div className="w-full h-full flex flex-col items-start gap-5">
              <Link href="/dashboard" className="flex items-center gap-3">
                <FiHome className="w-8 h-8 p-1 bg-white rounded-xl" />
                <span className="text-sm whitespace-nowrap">Dashboard</span>
              </Link>
              <Link
                href="/dashboard/my-advertisements"
                className="flex items-center gap-3"
              >
                <ListIcon className="w-8 h-8 p-1 bg-white rounded-xl" />
                <span className="text-sm whitespace-nowrap">
                  My Advertisements
                </span>
              </Link>
              <Link
                href="/dashboard/add-advertisement"
                className="flex items-center gap-3"
              >
                <AddListIcon className="w-8 h-8 p-1 bg-white rounded-xl" />
                <span className="text-sm whitespace-nowrap">
                  Add Advertisement
                </span>
              </Link>
              {role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="relative flex items-center gap-3"
                >
                  <GoHourglass className="w-8 h-8 p-1 bg-white rounded-xl" />
                  <span className="text-sm whitespace-nowrap">
                    Awaiting Confirmation
                  </span>
                  {unPublishedData.length && (
                    <span className="absolute w-2 h-2 bg-red-500 rounded-full top-0 left-0"></span>
                  )}
                </Link>
              )}
            </div>
          </div>
          <div className="w-full">
            <hr className="my-3" />
            <button
              onClick={async () => await signOut()}
              className="flex items-center gap-3"
            >
              <FiLogOut className="w-8 h-8 p-1 text-red-500 bg-white rounded-xl" />
              <span className="text-sm whitespace-nowrap">Log Out</span>
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 h-20 -right-1 -mt-10 flex p-0.5 bg-stone-100 rounded-full md:hidden">
          <span className="w-[3px] h-full bg-stone-400 rounded-full"></span>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
