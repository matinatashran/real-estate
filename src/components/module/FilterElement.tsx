"use client";

import { Dispatch, SetStateAction, useState, useRef, useEffect, FC } from "react";
import { IconType } from "react-icons/lib";

// element
import FilterListChildElement from "@/element/FilterListChildElement";

interface IProps {
  filterTitle: string;
  itemList: string[];
  filteredList: string[];
  setFilteredList: Dispatch<SetStateAction<string[]>>;
  TitleIcon: IconType;
}

const FilterElement: FC<IProps> = ({
  filterTitle,
  itemList,
  filteredList,
  setFilteredList,
  TitleIcon,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const elementRef: any = useRef();

  useEffect(() => {
    function clickOutsideHandler(event: MouseEvent) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsShow(false);
      }
    }

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [elementRef]);

  return (
    <div className="relative w-full">
      <span
        onClick={() => setIsShow(!isShow)}
        className="w-full md:w-40 flex items-center gap-2 rounded-lg bg-stone-300 text-sm font-semibold cursor-pointer p-2.5"
      >
        <TitleIcon className="w-5 h-5" />
        {filterTitle}
      </span>
      <ul
        ref={elementRef}
        className={`absolute top-12 w-full p-3 rounded-lg bg-white shadow-md shadow-stone-300 border z-20 flex flex-col items-start gap-2 transition-all duration-300 origin-top ${
          isShow ? "scale-100" : "scale-0"
        }`}
      >
        {itemList.map((item, index) => (
          <FilterListChildElement
            key={index}
            title={item}
            itemList={itemList}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
          />
        ))}
      </ul>
    </div>
  );
};

export default FilterElement;
