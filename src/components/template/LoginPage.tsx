"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// module
import Form from "@/module/form/Form";
import errorHandler from "@/module/form/error";

// validation-schema
import { loginSchema } from "@/validation-schema/authForm";

// element
import Button from "@/element/Button";

// utils
import { notify } from "@/utils/notify";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = async ({ email, password }: any) => {
    setIsPending(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setIsPending(false);
    if (res?.error) {
      notify(res.error, "error");
    } else {
      router.replace("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(loginHandler, errorHandler)}>
      <Form
        register={register}
        formClass="w-full flex flex-col justify-center gap-3"
        fieldList={[
          { name: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
      />
      <div className="w-full md:w-3/5 text-right my-2">
        <Link href="/forget-password" className="text-sm text-gray-300">
          Forget password ?
        </Link>
      </div>
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginPage;
