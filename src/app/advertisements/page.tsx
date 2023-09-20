// template
import Profile from "@/models/Profile";
import AllAdvertisementsPage from "@/template/AllAdvertisementsPage";
import connectDB from "@/utils/connectDB";

// utils
import { sortByLastestUpdate } from "@/utils/functions";
import getImages from "@/utils/getImages";

export interface ISearchParamsType {
  category: string;
  type: string;
}
interface IProps {
  searchParams: ISearchParamsType;
}

const AllAdvertisements = async ({ searchParams }: IProps) => {
  await connectDB();
  const profiles = await Profile.find({ published: true }).select("-userId");

  let finalData: any[] = profiles || null;
  if (searchParams.category) {
    finalData = finalData.filter((item) =>
      searchParams.category.includes(item.category)
    );
  }

  if (searchParams.type) {
    finalData = finalData.filter((item) =>
      searchParams.type.includes(item.adType)
    );
  }

  finalData = sortByLastestUpdate(JSON.parse(JSON.stringify(finalData)));
  finalData = finalData.map((item) => {
    return { ...item, images: getImages(item.category) };
  });

  return (
    <AllAdvertisementsPage
      data={JSON.parse(JSON.stringify(finalData))}
      searchParams={searchParams}
    />
  );
};

export default AllAdvertisements;

export async function generateMetadata({
  searchParams: { category, type },
}: IProps) {
  return {
    title: `Real estate ${category || type ? "|" : ""} ${category || ""} ${
      type || ""
    }`,
    description:
      "All advertisement for sale, rent, fullMortgage in category of homes, apartments, shops and offices ...",
  };
}
