import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";

interface IProps {
  className: string;
  isShowMenu?: boolean | undefined;
  setIsShowMenu?: Dispatch<SetStateAction<boolean>> | undefined;
  status: "authenticated" | "loading" | "unauthenticated";
}

const Menu = ({ status, className, isShowMenu, setIsShowMenu }: IProps) => {
  return (
    <>
      {isShowMenu && (
        <div
          onClick={() => setIsShowMenu && setIsShowMenu(false)}
          className="w-full h-full fixed top-0 left-0 bg-black z-40 opacity-30 md:hidden"
        ></div>
      )}
      <div className={className}>
        <div
          onClick={() => setIsShowMenu && setIsShowMenu(false)}
          className="absolute p-[1px] right-7 top-7 cursor-pointer md:hidden"
        >
          <GrFormClose className="w-7 h-7" />
        </div>
        <ul className="w-full flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-5 md:mt-auto">
          <li>
            <Link
              href="/"
              onClick={() => setIsShowMenu && setIsShowMenu(false)}
              className="text-sm text-gray-600"
            >
              Home
            </Link>
          </li>
          <li className="md:mr-10">
            <Link
              href="/advertisements"
              onClick={() => setIsShowMenu && setIsShowMenu(false)}
              className="text-sm text-gray-600"
            >
              Advertisements
            </Link>
          </li>
          {status === "authenticated" ? (
            <li className="hidden md:flex">
              <Link
                href="/dashboard"
                onClick={() => setIsShowMenu && setIsShowMenu(false)}
                className="bg-gray-200 rounded-full px-0.5 py-1.5"
              >
                <FiUser className="w-6 h-6" />
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  onClick={() => setIsShowMenu && setIsShowMenu(false)}
                  className="text-sm text-black"
                >
                  Login
                </Link>
              </li>
              <li className="flex">
                <Link
                  href="/register"
                  onClick={() => setIsShowMenu && setIsShowMenu(false)}
                  className="w-full text-center text-sm text-black border border-black py-1 px-3 rounded-full"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;
