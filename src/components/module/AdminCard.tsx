import Image from "next/image";
import { BiSolidUser } from "react-icons/bi";

// utils
import { toUpperCaseFirstLetter } from "@/utils/functions";
import { ImageListType } from "@/utils/getImages";

// module
import AdminCardButtons from "./AdminCardButtons";

type UserType = "ADMIN" | "USER";

interface IProps {
  id: string;
  createdBy: string;
  role: UserType;
  title: string;
  description: string;
  category: string;
  adType: string;
  images: ImageListType,
  updatedAt: string;
}

const AdminCard = ({
  id,
  createdBy,
  role,
  title,
  description,
  category,
  adType,
  images,
  updatedAt,
}: IProps) => {
  return (
    <div className="relative grid gap-3 grid-cols-5 grid-rows-3 md:max-h-[230px] shadow-lg p-5 rounded-lg bg-stone-100">
      <div className="w-full h-[150px] hidden md:block row-span-3">
        <Image src={images[0]} alt="home" className="w-full h-full rounded-[1rem]" />
      </div>
      <h3 className="text-sm md:text-base font-bold col-span-2">{title}</h3>
      <div className="flex items-center gap-1 justify-self-end place-self-start col-span-3 md:col-span-2">
        <span className="text-xs px-2 py-1 rounded-md bg-black text-white">
          {toUpperCaseFirstLetter(category)}
        </span>
        {" - "}
        <span className="text-xs px-2 py-1 rounded-md border border-black">
          {toUpperCaseFirstLetter(adType)}
        </span>
      </div>
      <p className="text-xs md:text-sm text-gray-500 line-clamp-2 lg:line-clamp-3 col-span-5 md:col-span-4">
        {description}
      </p>
      <div className="flex items-center gap-2 justify-self-start place-self-end">
        <div className="relative w-6 h-6 md:w-7 md:h-7 min-w-[24px] flex justify-center items-center bg-gray-200 rounded-full">
          <BiSolidUser className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <span className="absolute left-0 -bottom-4 text-[10px] font-semibold text-gray-400">
            {role === "ADMIN" && "Admin"}
          </span>
        </div>
        <span className="text-xs text-gray-400">{createdBy}</span>
      </div>
      <span className="text-xs font-semibold text-stone-600 justify-self-end place-self-end col-span-4 md:col-span-3">
        {updatedAt}
      </span>
      <AdminCardButtons id={id} />
    </div>
  );
};

export default AdminCard;