"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

// module
import Form from "@/module/form/Form";
import errorHandler from "@/module/form/error";

// validation-schema
import { registerSchema } from "@/validation-schema/authForm";

// element
import Button from "@/element/Button";

// utils
import { notify } from "@/utils/notify";

type FormType = InferType<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerHandler = async ({
    email,
    password,
    firstname,
    lastname,
  }: FormType) => {
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
  };

  return (
    <form onSubmit={handleSubmit(registerHandler, errorHandler)}>
      <Form
        register={register}
        formClass="w-full flex flex-col justify-center gap-3"
        fieldList={[
          { name: "firstname", placeholder: "Firstname (Optional)" },
          { name: "lastname", placeholder: "Lastname (Optional)" },
          { name: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
      />
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
