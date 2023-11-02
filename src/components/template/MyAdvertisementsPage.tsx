import { FC } from "react";

// module
import AdCard from "@/module/AdCard";
import DashboardPagesTitle from "@/module/DashboardPagesTitle";
import NotExist from "@/module/NotExist";

interface IProps {
  advertisements: object[];
}

const MyAdvertisementsPage: FC<IProps> = ({ advertisements }) => {
  return (
    <div className="w-[80%] h-full mx-auto flex flex-col mb-20">
      <DashboardPagesTitle title="My Advertisements" />
      <div
        className={`w-full ${
          advertisements.length
            ? "grid grid-cols-1 sm:grid-cols-2 sc900:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-8 mt-10"
            : "flex items-center justify-center"
        }`}
      >
        {advertisements.length ? (
          advertisements.map((item, index) => (
            <AdCard key={index} data={JSON.parse(JSON.stringify(item))} />
          ))
        ) : (
          <NotExist title="There is no advertisement yet!" />
        )}
      </div>
    </div>
  );
};

export default MyAdvertisementsPage;
