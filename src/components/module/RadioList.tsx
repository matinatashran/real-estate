import { Dispatch, FC, SetStateAction } from "react";
import { BsCheckLg } from "react-icons/bs";

interface IValueType {
  value: string;
  title: string;
}

interface IRadioType {
  radioTitle: string;
  className: string;
  valueList: IValueType[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const RadioList: FC<IRadioType> = ({
  radioTitle,
  valueList,
  className,
  selected,
  setSelected,
}) => {
  return (
    <div className="w-full flex flex-col items-start gap-2 md:w-3/5">
      <span className="px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700">
        {radioTitle}
      </span>
      <div className={className}>
        {valueList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item.value)}
            className={`relative border border-black h-8 flex justify-center items-center rounded-md overflow-hidden cursor-pointer transition-all duration-500 ${
              selected === item.value
                ? "px-10 text-white bg-black"
                : "px-5 text-black bg-white"
            }`}
          >
            <span
              className={`absolute left-0 transition duration-500 ${
                selected === item.value ? "translate-x-2" : "-translate-x-full"
              }`}
            >
              <BsCheckLg className="w-6 h-6 text-white" />
            </span>
            <span className="text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioList;
