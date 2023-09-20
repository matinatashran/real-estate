import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-multi-date-picker";

interface IDatePickerProps {
  value: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
}

const CustomDatePicker = ({ value, setValue }: IDatePickerProps) => {
  const dateChangeHandler = (e: any) => {
    if (e) {
      const date = new Date(e);
      setValue(date);
    } else {
      setValue(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-2 md:w-3/5">
      <span className="px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700">
      Construction Date
      </span>
      <DatePicker
        value={value}
        onChange={dateChangeHandler}
        inputClass="w-3/5 text-sm p-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
      />
    </div>
  );
};

export default CustomDatePicker;
