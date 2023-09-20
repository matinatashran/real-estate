import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

// template
import MyAdvertisementsPage from "@/template/MyAdvertisementsPage";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";
import { sortByLastestUpdate } from "@/utils/functions";
import getImages from "@/utils/getImages";

const MyAdvertisements = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  const [user] = await User.aggregate([
    { $match: { email: session?.user?.email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      },
    },
  ]);

  let data = user.profiles ? sortByLastestUpdate(JSON.parse(JSON.stringify(user.profiles))) : [];
  data = data.map((item) => {
    return { ...item, images: getImages(item.category) };
  });
  return (
    <MyAdvertisementsPage advertisements={JSON.parse(JSON.stringify(data))} />
  );
};

export default MyAdvertisements;

export async function generateMetadata(): Promise<Metadata | undefined> {
  const session = await getServerSession(authOptions);
  return {
    title: "advertisement these are published by user",
    description: `Advertisements posted by ${session?.user?.email}`,
  };
}
