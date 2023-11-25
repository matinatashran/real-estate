"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// module
import Form from "@/module/form/Form";

// validation-schema
import { registerSchema } from "@/validation-schema/authForm";

// element
import Button from "@/element/Button";

// utils
import { notify } from "@/utils/notify";

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const errorHandler = (error: FieldError) => {
    notify(Object.values(error)[0]["message"], "error");
  };

  const registerHandler = async ({
    email,
    password,
    firstname,
    lastname,
  }: any) => {
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
