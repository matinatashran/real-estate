import { FC } from "react";

// module
import Header from "@/module/Header";
import HomeCategory from "@/module/HomeCategory";
import HomeNewestAd from "@/module/HomeNewestAd";

interface IProps {
  data: any[];
}

const HomePage: FC<IProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-16 pb-10">
      <Header />
      <HomeCategory />
      <HomeNewestAd data={data} />
      <div></div>
    </div>
  );
};

export default HomePage;
