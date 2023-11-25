import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface IDatePickerProps {
  name: string;
  control: Control<FieldValues, any>;
}

const CustomDatePicker: FC<IDatePickerProps> = ({ name, control }) => {
  return (
    <div className="w-full flex flex-col items-start gap-2 md:w-3/5">
      <span className="px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700">
        Construction Date
      </span>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <DatePicker
              value={field.value || null}
              onChange={(date: DateObject) =>
                field.onChange(
                  date ? new Date(date.toString()).toISOString() : null
                )
              }
              inputClass="w-3/5 text-sm p-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
            />
          );
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
