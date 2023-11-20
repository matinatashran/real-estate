import { FC } from "react";

// module
import Header from "@/module/landing/Header";
import HomeCategory from "@/module/landing/HomeCategory";
import HomeNewestAd from "@/module/landing/HomeNewestAd";

interface IProps {
  data: any[];
}

const HomePage: FC<IProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-16 pb-10">
      <Header />
      <HomeCategory />
      <HomeNewestAd data={data} />
    </div>
  );
};

export default HomePage;
