"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// utils
import { validation } from "@/utils/validation";
import { notify } from "@/utils/notify";

// element
import ForgetPassForm from "@/module/ForgetPassForm";
import ChangePassForm from "@/module/ChangePassForm"

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [OTPCode, setOTPCode] = useState<string>("");
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  // -------------------
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const sendPasswordHandler = async () => {
    const emptyErr = validation([email], "NOT_EMPTY");
    const emailErr = validation(email, "EMAIL");

    if (emptyErr || emailErr) {
      notify(emptyErr || emailErr, "error");
    } else {
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
      }
    }
  };

  const verifyPasswordHandler = async () => {
    const emptyErr = validation([verifyPassword], "NOT_EMPTY");
    if (emptyErr) {
      notify(emptyErr, "error");
    } else {
      if (OTPCode === verifyPassword) {
        setIsVerify(true);
      } else {
        notify("Verify password incorrect!", "error");
      }
    }
    console.log(OTPCode, verifyPassword);
  };

  const changePasswordHandler = async () => {
    const emptyErr = validation([newPassword], "NOT_EMPTY");
    const passwordErr = validation(newPassword, "PASSWORD");
    const notEqualErr =
      newPassword !== confirmPassword ? "Confirm password incorrect!" : "";

    if (emptyErr || passwordErr || notEqualErr) {
      notify(emptyErr || passwordErr || notEqualErr, "error");
    } else {
      setIsPending(true);
      const res = await fetch(
        "/api/auth/change-password",
        {
          method: "PATCH",
          body: JSON.stringify({
            email,
            newPassword,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsPending(false);
      const data = await res.json();
      if (data.error) {
        notify(data.error, "error");
      } else {
        notify(data.message, "success");
        router.replace("/login");
      }
    }
  };

  const keyDownHandler = () => {
    if (isVerify) {
      changePasswordHandler();
    } else if (isSendEmail) {
      verifyPasswordHandler();
    } else {
      sendPasswordHandler();
    }
  };

  return (
    <div onKeyDown={(e) => e.code === "Enter" && keyDownHandler()}>
      {isVerify ? (
        <ChangePassForm
          isPending={isPending}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          changePasswordHandler={changePasswordHandler}
        />
      ) : (
        <ForgetPassForm
          isPending={isPending}
          isSendEmail={isSendEmail}
          email={email}
          setEmail={setEmail}
          verifyPassword={verifyPassword}
          setVerifyPassword={setVerifyPassword}
          sendPasswordHandler={sendPasswordHandler}
          verifyPasswordHandler={verifyPasswordHandler}
        />
      )}
    </div>
  );
};

export default ForgetPasswordPage;
