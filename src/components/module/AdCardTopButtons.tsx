"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";

// utils
import { confirmDelete } from "@/utils/Confirmation";
import { notify } from "@/utils/notify";

interface IProps {
  id: string;
}

const AdCardTopButtons = ({ id }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const deleteHandler = async () => {
    const isConfirmed = await confirmDelete("Are you sure you want to delete?");
    if (isConfirmed) {
      const res = await fetch(`/api/profile/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.error) {
        return notify(data.error, "error");
      } else {
        notify(data.message, "success");
        router.refresh();
      }
    }
  };

  const editHandler = () => {
    router.push(`/dashboard/my-advertisements/${id}`);
  };

  return (
    <div
      className={`${
        pathname === "/dashboard/my-advertisements" ? "block" : "hidden"
      } absolute -bottom-4 left-0 w-full flex items-center justify-between px-5`}
    >
      <button
        onClick={deleteHandler}
        className="w-8 h-8 bg-white bordr border-black shadow-lg cursor-pointer flex justify-center items-center rounded-full"
      >
        <FiTrash2 className="w-5 h-5 text-red-500" />
      </button>
      <button
        onClick={editHandler}
        className="w-8 h-8 bg-white bordr border-black shadow-lg cursor-pointer flex justify-center items-center rounded-full"
      >
        <AiFillEdit className="w-5 h-5 text-stone-500" />
      </button>
    </div>
  );
};

export default AdCardTopButtons;
