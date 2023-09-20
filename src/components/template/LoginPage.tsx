"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

// module
import FormInputs from "@/module/FormInputs";

// element
import Button from "../element/Button";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler = async () => {
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
    <div onKeyDown={(e) => e.code === "Enter" && loginHandler()}>
      <FormInputs
        formClass="w-full flex flex-col justify-center gap-3"
        inputList={[
          { value: email, setValue: setEmail, placeholder: "Email" },
          { value: password, setValue: setPassword, placeholder: "Password" },
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
        onButtonClick={loginHandler}
      >
        Log In
      </Button>
    </div>
  );
};

export default LoginPage;
