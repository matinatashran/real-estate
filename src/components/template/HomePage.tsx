// module
import Header from "@/module/Header";
import HomeCategory from "@/module/HomeCategory";
import HomeNewestAd from "@/module/HomeNewestAd";

interface IProps {
  data: any[];
}

const HomePage = ({ data }: IProps) => {
  return (
    <div className="flex flex-col gap-16 pb-10">
      <Header />
      <HomeCategory />
      <HomeNewestAd data={data} />
    </div>
  );
};

export default HomePage;
