"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdEye } from "react-icons/io";

// utils
import { sp } from "@/utils/replaceNumber";
import { toUpperCaseFirstLetter } from "@/utils/functions";

// module
import AdCardTopButtons from "./AdCardTopButtons";

interface IProps {
  data: any;
}

const AdCard: FC<IProps> = ({ data }) => {
  const pathname = usePathname();

  return (
    <div className="relative w-full h-[380px] shadow-lg rounded-[2rem] flex flex-col">
      <AdCardTopButtons id={data._id} />
      <div>
        <div className="w-full h-[200px] rounded-[2rem] rounded-bl-none overflow-hidden">
          <Link
            href={`${pathname === "/" ? "advertisements" : pathname}/${
              data._id
            }`}
          >
            <Image
              src={data.images[0]}
              alt="real estate"
              className="w-full h-full hover:scale-110 transition duration-300"
            />
          </Link>
        </div>
        <div className="w-full flex justify-between items-center mt-2 px-2">
          <span className="text-sm font-semibold border-l-[3px] border-black p-1 line-clamp-1">
            {toUpperCaseFirstLetter(data.title)}
          </span>
          <span className="text-xs font-semibold text-right border border-black rounded-full py-1 px-2">
            {sp(`${data.price}`)}
          </span>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between p-2">
        <p className="text-xs text-left text-gray-400 p-1 bg-stone-100 rounded-md line-clamp-3">
          {data.description}
        </p>
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-semibold text-gray-400 text-right">
            {new Date(data.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
          <Link
            href={`/advertisements/${data._id}`}
            className="w-[50%] py-2 text-white text-sm bg-black rounded-xl mx-auto flex justify-center items-center gap-2"
          >
            See More
            <IoMdEye className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
