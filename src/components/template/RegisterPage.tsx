"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// module
import FormInputs from "@/module/FormInputs";

// element
import Button from "../element/Button";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

const RegisterPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const registerHandler = async () => {
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
    <div onKeyDown={(e) => e.code === "Enter" && registerHandler()}>
      <FormInputs
        formClass="w-full flex flex-col justify-center gap-3"
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
          { value: password, setValue: setPassword, placeholder: "Password" },
        ]}
      />
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
        onButtonClick={registerHandler}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterPage;
