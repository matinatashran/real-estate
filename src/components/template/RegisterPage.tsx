"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// module
import Form from "@/module/form/Form";

// element
import Button from "@/element/Button";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const registerHandler = async ({
    email,
    password,
    firstname,
    lastname,
  }: any) => {
    const emptyErr = validation([email, password], "NOT_EMPTY");
    const emailErr = validation(email, "EMAIL");
    const passwordErr = validation(password, "PASSWORD");

    if (emptyErr || emailErr || passwordErr) {
      return notify(emptyErr || emailErr || passwordErr, "error");
    } else {
      setIsPending(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setIsPending(false);
      if (data.error) {
        notify(data.error, "error");
      } else {
        notify(data.message, "success");
        router.push("/login");
      }
    }
  };

  return (
    <div onKeyDown={(e) => e.code === "Enter" && handleSubmit(registerHandler)}>
      <Form
        register={register}
        formClass="w-full flex flex-col justify-center gap-3"
        fieldList={[
          { name: "firstname", placeholder: "Firstname (Optional)" },
          { name: "lastname", placeholder: "Lastname (Optional)" },
          { name: "email", placeholder: "Email" },
          { name: "password", placeholder: "Password" },
        ]}
      />
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
        onButtonClick={handleSubmit(registerHandler)}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterPage;
