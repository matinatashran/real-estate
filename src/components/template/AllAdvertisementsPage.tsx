"use client";

import { FC, useState } from "react";

import { ISearchParamsType } from "src/app/advertisements/page";

// module
import DashboardPagesTitle from "@/module/DashboardPagesTitle";
import AdCard from "@/module/cards/AdCard";
import NotExist from "@/module/NotExist";
import FilterSection from "@/module/FilterSection";

interface IProps {
  data: any[];
  searchParams: ISearchParamsType;
}

const AllAdvertisementsPage: FC<IProps> = ({ data, searchParams }) => {
  const [searchedPhrase, setSearchedPhrase] = useState<string>("");

  return (
    <div className="w-[99.5%] md:w-[95%] h-full mx-auto flex flex-col items-center">
      <DashboardPagesTitle title="Advertisements" />
      <div className="w-full flex flex-col gap-5 p-2 md:p-5">
        <FilterSection
          searchParams={searchParams}
          searchedPhrase={searchedPhrase}
          setSearchedPhrase={setSearchedPhrase}
        />
        <div
          className={`w-full ${
            data.length
              ? "grid grid-cols-1 sm:grid-cols-2 sc900:grid-cols-3 2xl:grid-cols-4 gap-5"
              : "flex items-center justify-center"
          }`}
        >
          {data.length ? (
            data.map(
              (item, index) =>
                item.title
                  .toLowerCase()
                  .includes(searchedPhrase.toLowerCase()) && (
                  <AdCard key={index} data={item} />
                )
            )
          ) : (
            <NotExist title="There is no advertisement!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAdvertisementsPage;
