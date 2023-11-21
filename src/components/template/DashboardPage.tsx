"use client";

import { useState, useEffect, FC } from "react";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { HiUser } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";

// utils
import { notify } from "@/utils/notify";

// element
import Button from "@/element/Button";

// module
import Form from "@/module/form/Form";
import ChangePassForm from "@/module/form/ChangePassForm";
import errorHandler from "@/module/form/error";
import { editUserSchema } from "@/module/form/validation/authForm";

interface IProps {
  data: {
    email: string;
    firstname: string;
    lastname: string;
  };
}
const DashboardPage: FC<IProps> = ({ data }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isChangePass, setIsChangePass] = useState<boolean>(false);
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    resolver: yupResolver(editUserSchema),
  });

  watch();

  useEffect(() => {
    if (Object.keys(data).length) {
      setValue("email", data.email);
      setValue("firstname", data.firstname);
      setValue("lastname", data.lastname);
    }
  }, [data]);

  const editUserHandler = async ({ email, firstname, lastname }: any) => {
    setIsPending(true);
    const res = await fetch("/api/edit-user", {
      method: "PATCH",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setIsPending(false);
    if (data.error) {
      notify(data.error, "error");
    } else {
      notify(data.message, "success");
    }
  };
  return (
    <div className="w-[90%] md:w-[85%] mx-auto flex flex-col items-center gap-5 lg:gap-16 p-5 lg:p-16 bg-stone-100 rounded-2xl">
      <div className="relative w-full min-h-[300px] lg:min-h-[250px] rounded-2xl bg-white">
        <div className="absolute top-1/2 -mt-24 lg:-mt-[5.5rem] left-5 w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-stone-100 flex justify-center items-center">
          <HiUser className="w-20 h-20 lg:w-28 lg:h-28 text-stone-400" />
        </div>
        <div className="lg:ml-36 h-full flex flex-col justify-between py-8 px-5">
          <div className="flex justify-end">
            <button
              onClick={async () => await signOut()}
              className="px-2 py-1.5 font-semibold flex items-center gap-2 text-xs rounded-md text-red-500 border-2 border-red-500"
            >
              Log Out <FiLogOut className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-auto">
            <h2 className="text-2xl md:text-3xl font-bold">
              {getValues("firstname")} {getValues("lastname")}
            </h2>
            <span className="text-sm md:text-base">{getValues("email")}</span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[80%] bg-white rounded-2xl py-8 px-5 flex flex-col items-center">
        <form onSubmit={handleSubmit(editUserHandler, errorHandler)}>
          <Form
            register={register}
            formClass="w-full flex flex-col items-center justify-center gap-6"
            fieldList={[
              { name: "firstname", placeholder: "Firstname (Optional)" },
              { name: "lastname", placeholder: "Lastname (Optional)" },
              { name: "email", placeholder: "Email" },
            ]}
          />
          <Button
            isPending={isPending}
            className="w-full md:w-72 my-8 bg-black text-white text-center py-2 rounded-md"
          >
            Save Changes
          </Button>
        </form>
        <hr className="w-full mb-3" />
        <div className="w-full">
          <span
            onClick={() => setIsChangePass(!isChangePass)}
            className="text-sm cursor-pointer text-blue-500"
          >
            {isChangePass ? "Back" : "Change Password"}
          </span>
        </div>
        {isChangePass ? (
          <ChangePassForm
            formJustify="center"
            className="w-full flex flex-col items-center"
          />
        ) : null}
      </div>
    </div>
  );
};

export default DashboardPage;
