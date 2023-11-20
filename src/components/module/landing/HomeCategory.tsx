import { FaStore } from "react-icons/fa";
import { SiOnlyoffice } from "react-icons/si";
import { MdVilla, MdOutlineApartment } from "react-icons/md";
import HomeCategoryIcon from "../../element/HomeCategoryIcon";

const HomeCategory = () => {
  return (
    <div className="flex flex-col items-start px-2 md:px-10">
      <span className="bg-black text-stone-100 py-2 px-4 rounded-full text-xl md:text-2xl font-bold">
        Category
      </span>
      <div className="w-[94%] ml-5 md:w-full md:mx-5 flex justify-center md:justify-between flex-wrap gap-5 border-l-[3px] border-black p-5 pr-10">
        <HomeCategoryIcon title="Villa" IconElement={MdVilla} />
        <HomeCategoryIcon title="Apartment" IconElement={MdOutlineApartment} />
        <HomeCategoryIcon title="Shop" IconElement={FaStore} />
        <HomeCategoryIcon title="Office" IconElement={SiOnlyoffice} />
      </div>
    </div>
  );
};

export default HomeCategory;
