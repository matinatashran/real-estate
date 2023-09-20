"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TiArrowUnsorted } from "react-icons/ti";
import { RiSearch2Line } from "react-icons/ri";

// module
import FilterElement from "./FilterElement";

import { ISearchParamsType } from "src/app/advertisements/page";

interface IProps {
  searchParams: ISearchParamsType;
  searchedPhrase: string;
  setSearchedPhrase: Dispatch<SetStateAction<string>>;
}

const FilterSection = ({
  searchParams,
  searchedPhrase,
  setSearchedPhrase,
}: IProps) => {
  const router = useRouter();
  const [filterByCategory, setFilterByCategory] = useState<string[]>(
    searchParams.category ? [...searchParams.category.split("-")] : []
  );
  const [filterByType, setFilterByType] = useState<string[]>(
    searchParams.type ? [...searchParams.type.split("-")] : []
  );

  useEffect(() => {
    if (filterByCategory.length || filterByType.length) {
      const categoryQuery =
        filterByCategory.length && !filterByCategory.includes("all")
          ? `category=${filterByCategory.join("-")}`
          : "";

      const typeQuery = filterByType.length
        ? `type=${filterByType.join("-")}`
        : "";

      let finalQuery = "";
      if (categoryQuery && typeQuery) {
        finalQuery = categoryQuery + "&" + typeQuery;
      } else {
        finalQuery = categoryQuery || typeQuery;
      }
      router.push(`/advertisements?${finalQuery}`);
    } else if (searchParams.category || searchParams.type) {
      router.push("/advertisements");
    }
  }, [filterByCategory, filterByType]);

  return (
    <div className="sticky top-24 flex flex-col md:flex-row items-center gap-2 border-b-2 py-3 bg-white z-50">
      <div className="w-full md:w-auto flex gap-2">
        <FilterElement
          filterTitle="Category"
          itemList={["all", "villa", "apartment", "shop", "office"]}
          filteredList={filterByCategory}
          setFilteredList={setFilterByCategory}
          TitleIcon={BiSolidCategoryAlt}
        />
        <FilterElement
          filterTitle="Type"
          itemList={["sale", "rent", "fullMortgage"]}
          filteredList={filterByType}
          setFilteredList={setFilterByType}
          TitleIcon={TiArrowUnsorted}
        />
      </div>
      <div className="relative w-full">
        <input
          type="text"
          value={searchedPhrase}
          onChange={(e) => setSearchedPhrase(e.target.value)}
          placeholder="Search among advertisement's title ..."
          className="border border-stone-300 p-2.5 pl-16 rounded-lg text-sm w-full transition duration-300 focus:shadow-lg focus:outline-none"
        />
        <div className="absolute top-3 left-3 -mt-1.5 border-r-2 border-stone-600 pr-3">
          <RiSearch2Line className="w-6 h-6 rotate-90 text-stone-600 mt-0.5" />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
