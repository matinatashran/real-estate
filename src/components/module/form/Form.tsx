import { FC } from "react";
import {
  UseFormRegister,
  FieldValues,
  UseFormSetValue,
  Controller,
  Control,
} from "react-hook-form";

// utils
import { sp } from "@/utils/replaceNumber";

interface IFieldProps {
  name: string;
  type?: "text" | "textArea" | "password" | "numeric";
  label?: string | undefined;
  sp?: boolean;
  placeholder?: string | undefined;
}

interface IProps {
  formClass: string;
  fieldList: IFieldProps[];
  control?: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
}

const Form: FC<IProps> = ({ formClass, fieldList, register, control }) => {
  return (
    <div className={formClass}>
      {fieldList.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col items-start gap-2 md:w-3/5"
        >
          <label
            className={`px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700 ${
              item.label ? "block" : "hidden"
            }`}
          >
            {item.label}
          </label>
          {item.type === "textArea" ? (
            <textarea
              {...register(item.name)}
              placeholder={item.placeholder ?? ""}
              className="w-full min-h-[100px] text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
            />
          ) : item.type === "numeric" ? (
            ControlerInput({
              name: item.name,
              placeholder: item.placeholder,
              control,
              sp,
            })
          ) : (
            <input
              {...register(item.name)}
              type={item.type}
              placeholder={item.placeholder ?? ""}
              className="w-full text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;

const ControlerInput = ({ name, control, sp, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          placeholder={placeholder ?? ""}
          className="w-full text-sm px-2 py-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (sp) value = sp(value);
            field.onChange(value);
          }}
        />
      )}
    />
  );
};
