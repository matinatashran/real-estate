"use client";

import { useEffect, useState } from "react";

// element
import ForgetPassForm from "@/module/form/ForgetPassForm";
import ChangePassForm from "@/module/form/ChangePassForm";

const ForgetPasswordPage = () => {
  const [isVerify, setIsVerify] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      window.localStorage.removeItem("FP_U_Email");
    };
  }, []);

  return (
    <>
      {isVerify ? (
        <ChangePassForm />
      ) : (
        <ForgetPassForm setIsVerify={setIsVerify} />
      )}
    </>
  );
};

export default ForgetPasswordPage;
