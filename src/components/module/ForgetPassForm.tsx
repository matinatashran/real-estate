"use client";

import { Dispatch, SetStateAction, useState, FC } from "react";

// element
import Button from "@/element/Button";

// module
import Timer from "./Timer";

interface IProps {
  isPending: boolean;
  isSendEmail: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  verifyPassword: string;
  setVerifyPassword: Dispatch<SetStateAction<string>>;
  sendPasswordHandler: any;
  verifyPasswordHandler: any;
}

const ForgetPassForm: FC<IProps> = ({
  isPending,
  isSendEmail,
  email,
  setEmail,
  verifyPassword,
  setVerifyPassword,
  sendPasswordHandler,
  verifyPasswordHandler,
}) => {
  const [time, setTime] = useState<number>(120);
  const [isStartTimer, setIsStartTimer] = useState<boolean>(true);

  const resendCodeClickHandler = () => {
    sendPasswordHandler();
    setIsStartTimer(true);
    setTime(120);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center gap-3 md:w-3/5">
        {!isSendEmail ? (
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
          />
        ) : (
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              placeholder="Verify Password"
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
        className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
        onButtonClick={
          isSendEmail ? verifyPasswordHandler : sendPasswordHandler
        }
        isPending={isPending}
      >
        {isSendEmail ? "Verify Password" : "Send Password"}
      </Button>
    </>
  );
};

export default ForgetPassForm;
