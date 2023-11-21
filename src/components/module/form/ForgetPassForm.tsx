"use client";

import { Dispatch, SetStateAction, useState, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// element
import Button from "@/element/Button";

// .
import Timer from "./Timer";
import errorHandler from "./error";
import { emailFormSchema, verifyFormSchema } from "./validation/authForm";

// utils
import { notify } from "@/utils/notify";

interface IProps {
  setIsVerify: Dispatch<SetStateAction<boolean>>;
}

const ForgetPassForm: FC<IProps> = ({ setIsVerify }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [OTPCode, setOTPCode] = useState<string>("");
  const [time, setTime] = useState<{ seconds: number }>({ seconds: 120 });
  const [isStartTimer, setIsStartTimer] = useState<boolean>(true);

  const emailForm = useForm({ resolver: yupResolver(emailFormSchema) });
  const verifyForm = useForm({ resolver: yupResolver(verifyFormSchema) });

  const sendPasswordHandler = async ({ email }: any) => {
    setIsPending(true);
    const res = await fetch("/api/auth/send-password", {
      method: "POST",
      body: JSON.stringify({
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
      setOTPCode(data.OTP);
      setIsSendEmail(true);
      window.localStorage.setItem(
        "FP_U_Email",
        JSON.stringify(emailForm.getValues("email"))
      );
    }
  };

  const verifyCodeHandler = async ({ verifyCode }: any) => {
    if (OTPCode === verifyCode) {
      setIsVerify(true);
    } else {
      notify("Verify password incorrect!", "error");
    }
  };

  const resendCodeClickHandler = () => {
    let email = window.localStorage.getItem("FP_U_Email");
    if (email) {
      email = JSON.parse(email);
      sendPasswordHandler({ email });
      setIsStartTimer(true);
      setTime({ seconds: 120 });
    }
  };

  return (
    <form
      onSubmit={
        isSendEmail
          ? verifyForm.handleSubmit(verifyCodeHandler, errorHandler)
          : emailForm.handleSubmit(sendPasswordHandler, errorHandler)
      }
    >
      <div className="w-full flex flex-col justify-center gap-3 md:w-3/5">
        {!isSendEmail ? (
          <input
            {...emailForm.register("email")}
            type="text"
            placeholder="Email"
            className="w-full text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
          />
        ) : (
          <div className="flex flex-col items-start gap-3">
            <input
              {...verifyForm.register("verifyCode")}
              type="text"
              placeholder="Verify Code"
              className="w-full text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
            />
            <button
              onClick={resendCodeClickHandler}
              disabled={isStartTimer}
              className="text-xs text-blue-500 ml-1 flex items-center gap-1 disabled:grayscale"
            >
              Resend Code
              <Timer time={time} setIsStartTimer={setIsStartTimer} />
            </button>
          </div>
        )}
      </div>
      <Button
        isPending={isPending}
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
      >
        {isSendEmail ? "Verify Code" : "Send Code"}
      </Button>
    </form>
  );
};

export default ForgetPassForm;
