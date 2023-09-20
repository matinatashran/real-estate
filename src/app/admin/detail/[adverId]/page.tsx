// template
import AdvertisementDetailPage from "@/template/AdvertisementDetailPage";

// models
import Profile from "@/models/Profile";

// utils
import connectDB from "@/utils/connectDB";
import { sortByLastestUpdate } from "@/utils/functions";
import getImages from "@/utils/getImages";

interface IParamsObj {
  adverId: string;
}

interface IProps {
  params: IParamsObj;
}

const AdminAdverDetail = async ({ params: { adverId } }: IProps) => {
  try {
    await connectDB();
    
    let data = await Profile.findOne({ _id: adverId });
    data = JSON.parse(JSON.stringify(data));
    data = { ...data, images: getImages(data.category) };
    return <AdvertisementDetailPage data={JSON.parse(JSON.stringify(data))} />;
  } catch (err) {
    console.log(err);
    return <h3>An Error occoured! Please try again.</h3>;
  }
};

export default AdminAdverDetail;
