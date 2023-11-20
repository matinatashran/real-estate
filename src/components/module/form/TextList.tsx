import { FC } from "react";
import {
  useFieldArray,
  Control,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { BiAddToQueue } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";

interface IProps {
  name: string;
  title: string;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
}
const TextList: FC<IProps> = ({ name, title, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });
  return (
    <div className="w-full flex flex-col items-start gap-2 md:w-3/5">
      <span className="px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700">
        {title}
      </span>
      {fields.map((_, index) => (
        <div key={index} className="w-full flex items-center gap-2">
          <input
            {...register(`${name}.${index}`)}
            type="text"
            className="w-3/5 text-sm p-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
          />
          <button
            onClick={() => remove(index)}
            className="p-2 border text-red-500 text-sm rounded-md"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={() => append("")}
        className="flex items-center gap-2 bg-black text-white py-1 px-3 rounded-md my-2"
      >
        <span className="text-sm">Add</span>
        <BiAddToQueue className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TextList;
