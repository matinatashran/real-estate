"use client";

import { Dispatch, SetStateAction } from "react";

// element
import Button from "@/element/Button";
import FormInputs from "@/module/FormInputs";

interface IProps {
  isPending: boolean;
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  changePasswordHandler: any;
}

const ChangePassForm = ({
  isPending,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  changePasswordHandler,
}: IProps) => {
  return (
    <div>
      <>
        <FormInputs
          formClass={"w-full flex flex-col justify-center gap-3"}
          inputList={[
            {
              value: newPassword,
              setValue: setNewPassword,
              placeholder: "New Password",
            },
            {
              value: confirmPassword,
              setValue: setConfirmPassword,
              placeholder: "Confirm Password",
            },
          ]}
        />
        <Button
          isPending={isPending}
          className="w-full md:w-3/5 my-8 bg-black text-white text-center py-2 rounded-md"
          onButtonClick={changePasswordHandler}
        >
          Change Password
        </Button>
      </>
    </div>
  );
};

export default ChangePassForm;
