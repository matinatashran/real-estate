import { Dispatch, FC, SetStateAction } from "react";
import { BiSolidSquareRounded as SquareIcon } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";

// utils
import { toUpperCaseFirstLetter } from "@/utils/functions";

interface IProps {
  title: string;
  itemList: string[];
  filteredList: string[];
  setFilteredList: Dispatch<SetStateAction<string[]>>;
}

const FilterListChildElement: FC<IProps> = ({
  title,
  itemList,
  filteredList,
  setFilteredList,
}) => {
  const elementClickHandler = () => {
    if (itemList.includes("all")) {
      if (title === "all" && itemList.length === filteredList.length) {
        setFilteredList([]);
        return;
      } else if (title === "all" && itemList.length !== filteredList.length) {
        setFilteredList([...itemList]);
        return;
      } else if (itemList.length === filteredList.length) {
        const newList = filteredList.filter(
          (item) => item !== "all" && item !== title
        );
        setFilteredList([...newList]);
        return;
      }
    }

    const index = filteredList.findIndex((item) => item === title);
    if (index === -1) {
      setFilteredList([...filteredList, title]);
    } else {
      const newList = filteredList.filter((item) => item !== title);
      setFilteredList([...newList]);
    }
  };

  return (
    <li
      onClick={() => elementClickHandler()}
      className="flex items-center gap-3 cursor-pointer"
    >
      <div className="w-5 h-5 relative">
        <BsCheckLg
          className={`w-5 h-4 absolute top-0.5 left-0 text-white transition duration-300 ${
            filteredList.includes(title) ? "opacity-100" : " opacity-0"
          }`}
        />
        <SquareIcon
          className={`w-full h-full transition duration-300 ${
            filteredList.includes(title) ? "fill-black" : "fill-gray-200"
          }`}
        />
      </div>
      <span
        className={`transition duration-300 text-sm ${
          filteredList.includes(title) ? "text-black" : "text-gray-300"
        }`}
      >
        {toUpperCaseFirstLetter(title)}
      </span>
    </li>
  );
};

export default FilterListChildElement;
