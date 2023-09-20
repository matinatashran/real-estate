// template
import HomePage from "@/template/HomePage";

// models
import Profile from "@/models/Profile";

// utils
import connectDB from "@/utils/connectDB";
import { sortByLastestUpdate } from "@/utils/functions";
import getImages from "@/utils/getImages";

const Home = async () => {
  try {
    await connectDB();
    let data = await Profile.find();
    data = sortByLastestUpdate(JSON.parse(JSON.stringify(data)));
    data = data.map((item) => {
      return { ...item, images: getImages(item.category) };
    });
    return <HomePage data={data.slice(0, 5)} />;
  } catch (err) {
    console.log(err);
    return <h3>An error occoured! Please try again.</h3>;
  }
};

export default Home;
