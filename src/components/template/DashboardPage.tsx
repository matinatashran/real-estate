"use client";

import { useState, useEffect, FC } from "react";
import { signOut } from "next-auth/react";
import { HiUser } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

// element
import Button from "@/element/Button";

// module
import FormInputs from "@/module/FormInputs";

interface IProps {
  data: {
    email: string;
    firstname: string;
    lastname: string;
  };
}

const DashboardPage: FC<IProps> = ({ data }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  useEffect(() => {
    if (Object.keys(data).length) {
      setEmail(data.email);
      setFirstname(data.firstname);
      setLastname(data.lastname);
    }
  }, [data]);

  const editUserHandler = async () => {
    const emptyErr = validation([email], "NOT_EMPTY");
    const emailErr = validation(email, "EMAIL");

    if (emptyErr || emailErr) {
      return notify(emptyErr || emailErr, "error");
    } else {
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
              {firstname} {lastname}
            </h2>
            <span className="text-sm md:text-base">{email}</span>
          </div>
        </div>
      </div>
      <div
        className="w-full lg:w-[80%] bg-white rounded-2xl py-8 px-5 flex flex-col items-center"
        onKeyDown={(e) => e.code === "Enter" && editUserHandler()}
      >
        <FormInputs
          formClass="w-full flex flex-col items-center justify-center gap-6"
          inputList={[
            {
              value: firstname,
              setValue: setFirstname,
              placeholder: "Firstname (Optional)",
            },
            {
              value: lastname,
              setValue: setLastname,
              placeholder: "Lastname (Optional)",
            },
            { value: email, setValue: setEmail, placeholder: "Email" },
          ]}
        />
        <Button
          isPending={isPending}
          className="w-full md:w-72 my-8 bg-black text-white text-center py-2 rounded-md"
          onButtonClick={editUserHandler}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
