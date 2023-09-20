import type { Metadata } from "next";

// template
import EditAdvertisementPage from "@/template/EditAdvertisementPage";

// models
import Profile from "@/models/Profile";

// utils
import connectDB from "@/utils/connectDB";

interface IParamsObj {
  adverId: string;
}

interface IProps {
  params: IParamsObj;
}

const EditAdvertisement = async ({ params: { adverId } }: IProps) => {
  try {
    await connectDB();

    const profile = await Profile.findOne({ _id: adverId });

    return <EditAdvertisementPage data={JSON.parse(JSON.stringify(profile))} />;
  } catch (err) {
    return <h3>Ad Error occoured! Please try again.</h3>;
  }
};

export default EditAdvertisement;

export async function generateMetadata({
  params: { adverId },
}: IProps): Promise<Metadata | undefined> {
  try {
    await connectDB();

    const profile = await Profile.findOne({ _id: adverId });
    return {
      title: profile.tagTitle,
      description: profile.tagDescription,
      authors: { name: profile.author },
    };
  } catch (err) {
    console.log(err);
  }
}
