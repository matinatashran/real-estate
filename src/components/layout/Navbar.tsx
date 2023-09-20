"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt4 as MenuIcon } from "react-icons/hi";
import { BiLogInCircle } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

// images
import logo from "@/public/images/real-estate-logo.jpg";

// module
import Menu from "@/layout/Menu";

const Navbar = () => {
  const { status } = useSession();
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div className="bg-white sticky top-0 z-[60]">
      <div className="w-[85%] h-14 m-auto flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="real estate" className="w-16" />
        </Link>
        <div className="flex items-center gap-3 md:hidden">
          <div onClick={() => setIsShowMenu(true)}>
            <MenuIcon className="w-7 h-7 cursor-pointer" />
          </div>
          {status === "authenticated" ? (
            <Link
              href="/dashboard"
              className="bg-gray-200 rounded-full px-0.5 py-1.5"
            >
              <FiUser className="w-6 h-6" />
            </Link>
          ) : (
            <Link href="/login" className="bg-black rounded-full px-1 py-1.5">
              <BiLogInCircle className="w-5 h-5 text-white rotate-180" />
            </Link>
          )}
        </div>

        <Menu
          status={status}
          className="hidden md:flex items-center p-0 gap-20 z-50 bg-white"
        />

        {/* short device menu */}
        <Menu
          status={status}
          className={`md:hidden w-full absolute top-0 right-0 flex flex-col bg-white gap-4 p-8 z-50 transition duration-[400ms] ${
            isShowMenu ? "translate-y-0" : "-translate-y-full"
          }`}
          isShowMenu={isShowMenu}
          setIsShowMenu={setIsShowMenu}
        />
      </div>
    </div>
  );
};

export default Navbar;
