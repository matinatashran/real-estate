"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// element
import Button from "@/element/Button";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

// .
import Form from "./Form";

interface IProps {
  className?: string | undefined;
  userEmail?: string | undefined;
  formJustify?: "left" | "center" | undefined;
}

const ChangePassForm: FC<IProps> = ({
  userEmail,
  className,
  formJustify = "left",
}) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const e = window.localStorage.getItem("FP_U_Email");
    setValue("email", e ? JSON.parse(e) : userEmail);
  }, []);

  const changePasswordHandler = async ({
    newPassword,
    confirmPassword,
  }: any) => {
    const emptyErr = validation([newPassword], "NOT_EMPTY");
    const passwordErr = validation(newPassword, "PASSWORD");
    const notEqualErr =
      newPassword !== confirmPassword ? "Confirm password incorrect!" : "";

    if (emptyErr || passwordErr || notEqualErr) {
      notify(emptyErr || passwordErr || notEqualErr, "error");
    } else {
      setIsPending(true);
      const res = await fetch("/api/auth/change-password", {
        method: "PATCH",
        body: JSON.stringify({
          email: getValues("email"),
          newPassword,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setIsPending(false);
      const data = await res.json();
      if (data.error) {
        notify(data.error, "error");
      } else {
        notify(data.message, "success");
        router.replace("/login");
      }
    }
  };

  return (
    <div className={className}>
      <Form
        register={register}
        formClass={`w-full flex flex-col justify-center gap-3 ${
          formJustify === "left" ? "items-start" : "items-center"
        }`}
        fieldList={[
          { name: "newPassword", placeholder: "New Password" },
          { name: "confirmPassword", placeholder: "Confirm Password" },
        ]}
      />
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
        onButtonClick={handleSubmit(changePasswordHandler)}
      >
        Change Password
      </Button>
    </div>
  );
};

export default ChangePassForm;
