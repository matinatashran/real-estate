import { FC } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { BsCheckLg } from "react-icons/bs";

interface IValueType {
  value: string;
  title: string;
}

interface IRadioType {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  name: string;
  radioTitle: string;
  className: string;
  valueList: IValueType[];
}

const RadioList: FC<IRadioType> = ({
  register,
  watch,
  name,
  radioTitle,
  valueList,
  className,
}) => {
  const radioWatch = watch(name);

  return (
    <div className="w-full flex flex-col items-start gap-2 md:w-3/5">
      <span className="px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700">
        {radioTitle}
      </span>
      <div className={className}>
        {valueList.map((item, index) => (
          <label
            key={index}
            htmlFor={item.value}
            className={`relative border border-black h-8 flex justify-center items-center rounded-md overflow-hidden cursor-pointer transition-all duration-500 ${
              radioWatch === item.value
                ? "px-10 text-white bg-black"
                : "px-5 text-black bg-white"
            }`}
          >
            <span
              className={`absolute left-0 transition duration-500 ${
                radioWatch === item.value
                  ? "translate-x-2"
                  : "-translate-x-full"
              }`}
            >
              <BsCheckLg className="w-6 h-6 text-white" />
            </span>
            <span className="text-sm">{item.title}</span>
            <input
              hidden
              {...register(name)}
              type="radio"
              name={name}
              value={item.value}
              id={item.value}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioList;
