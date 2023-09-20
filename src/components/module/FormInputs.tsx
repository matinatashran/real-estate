import { Dispatch, SetStateAction } from "react";

// utils
import { sp } from "@/utils/replaceNumber";

type inputType = "text" | "textArea" | "number";

type inputOptions = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string | undefined;
  inputLabel?: string | undefined;
  type?: inputType;
};

interface IProps {
  inputList: inputOptions[];
  formClass?: string | undefined;
}

const FormInputs = ({ inputList, formClass }: IProps) => {
  return (
    <div className={formClass}>
      {inputList.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col items-start gap-2 md:w-3/5"
        >
          <label
            className={`px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700 ${
              item.inputLabel ? "block" : "hidden"
            }`}
          >
            {item.inputLabel}
          </label>
          {item.type === "textArea" ? (
            <textarea
              value={item.value}
              onChange={(e) => item.setValue(e.target.value)}
              placeholder={item.placeholder ?? ""}
              className="w-full min-h-[100px] text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
            />
          ) : (
            <input
              type={
                item.placeholder?.includes("Password") ? "password" : "text"
              }
              value={item.value}
              onChange={(e) =>
                item.type === "number"
                  ? item.setValue(sp(e.target.value))
                  : item.setValue(e.target.value)
              }
              placeholder={item.placeholder ?? ""}
              className="w-full text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormInputs;
