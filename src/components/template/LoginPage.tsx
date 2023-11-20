"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";

// module
import Form from "@/module/form/Form";

// element
import Button from "../element/Button";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const loginHandler = async ({ email, password }: any) => {
    const emptyErr = validation([email, password], "NOT_EMPTY");

    if (emptyErr) {
      return notify(emptyErr, "error");
    } else {
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
    }
  };

  return (
    <div>
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
        onButtonClick={handleSubmit(loginHandler)}
      >
        Log In
      </Button>
    </div>
  );
};

export default LoginPage;
