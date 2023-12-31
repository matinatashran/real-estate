"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

// element
import Button from "@/element/Button";

// utils
import { notify } from "@/utils/notify";

// .
import Form from "./Form";
import errorHandler from "./error";

// validation-schema
import { changePasswordSchema } from "@/validation-schema/authForm";

type FormType = InferType<typeof changePasswordSchema>;

interface IProps {
  className?: string;
  userEmail?: string;
  formJustify?: "left" | "center";
}

const ChangePassForm: FC<IProps> = ({
  userEmail,
  className,
  formJustify = "left",
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormType>({
    resolver: yupResolver(changePasswordSchema),
  });

  const changePasswordHandler = async ({ newPassword }: FormType) => {
    setIsPending(true);
    const e = window.localStorage.getItem("FP_U_Email");
    const res = await fetch("/api/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        email: e ? JSON.parse(e) : userEmail,
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
      if (!userEmail) router.replace("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(changePasswordHandler, errorHandler)}
      className={className}
    >
      <Form
        register={register}
        formClass={`w-full flex flex-col justify-center gap-3 ${
          formJustify === "left" ? "items-start" : "items-center"
        }`}
        fieldList={[
          {
            name: "newPassword",
            type: "password",
            placeholder: "New Password",
          },
          {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
          },
        ]}
      />
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
      >
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassForm;
