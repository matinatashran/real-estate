"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

import { LuSend } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";

// utils
import { confirmDelete } from "@/utils/Confirmation";
import { notify } from "@/utils/notify";

interface IProps {
  id: string;
}

const AdminCardButtons: FC<IProps> = ({ id }) => {
  const router = useRouter();
  const [isPendingDelete, setIsPendingDelete] = useState<boolean>(false);
  const [isPendingPublish, setIsPendingPublish] = useState<boolean>(false);

  const deleteHandler = async () => {
    const isConfirmed = await confirmDelete("Are you sure you want to delete?");
    if (isConfirmed) {
      setIsPendingDelete(true);
      const res = await fetch(`/api/profile/delete/${id}`, {
        method: "DELETE",
      });

      setIsPendingDelete(false);
      const data = await res.json();
      if (data.error) {
        return notify(data.error, "error");
      } else {
        notify(data.message, "success");
        router.refresh();
      }
    }
  };

  const publishHandler = async () => {
    setIsPendingPublish(true);
    const res = await fetch(`/api/profile/publish/${id}`, {
      method: "PATCH",
    });

    setIsPendingPublish(false);
    const data = await res.json();
    if (data.error) {
      return notify(data.error, "error");
    } else {
      notify(data.message, "success");
      router.refresh();
    }
  };

  return (
    <div className="absolute -bottom-4 right-10 md:right-32 flex items-center gap-3">
      <button
        disabled={isPendingDelete}
        onClick={deleteHandler}
        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex justify-center items-center disabled:cursor-not-allowed"
      >
        <FiTrash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
        <div className="absolute top-1">
          <ThreeDots
            width="30"
            radius="9"
            color="#ef4444"
            visible={isPendingDelete}
          />
        </div>
      </button>
      <Link
        href={`/admin/detail/${id}`}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex justify-center items-center"
      >
        <TbListDetails className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
      </Link>
      <button
        disabled={isPendingPublish}
        onClick={publishHandler}
        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex justify-center items-center disabled:cursor-not-allowed"
      >
        <LuSend className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
        <div className="absolute top-1">
          <ThreeDots
            width="30"
            radius="9"
            color="#22c55e"
            visible={isPendingPublish}
          />
        </div>
      </button>
    </div>
  );
};

export default AdminCardButtons;
