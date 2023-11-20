import { FC } from "react";

// utils
import { toUpperCaseFirstLetter } from "@/utils/functions";
import { sp } from "@/utils/replaceNumber";
import { ImageListType } from "@/utils/getImages";

// module
import ShareButtons from "./ShareButtons";
import ImageSlider from "./ImageSlider";

interface IProps {
  adTitle: string;
  adType: string;
  price: number;
  constructionYear: string;
  images: ImageListType;
}

const ShowAdPicture: FC<IProps> = ({
  adTitle,
  adType,
  price,
  constructionYear,
  images,
}) => {
  return (
    <div className="relative w-full h-full bg-black p-5 lg:w-1/2 flex flex-col justify-center items-center gap-7">
      <div className="absolute top-5 left-5 text-center py-1 px-2 text-sm font-semibold bg-stone-200 rounded-md">
        {constructionYear}
      </div>
      <div className="text-white font-bold text-xl md:text-3xl mt-8 lg:mt-0">
        {toUpperCaseFirstLetter(adTitle)}
      </div>
      <div className="relative w-[90%] lg:h-[60%] xl:h-[80%]">
        <div className="w-[210px] md:w-[250px] h-[48px] absolute -top-5 right-1/2 -mr-[105px] md:-mr-[125px] rounded-md bg-stone-200 border-4 border-black font-bold text-xl md:text-2xl flex justify-center items-center z-10">
          For {adType.toUpperCase()}
        </div>
        <ImageSlider images={images} />
      </div>
      <div className="min-w-[150px] p-3 rounded-full text-center font-semibold bg-stone-200">
        $ {sp(`${price}`)}
      </div>
      <ShareButtons />
    </div>
  );
};

export default ShowAdPicture;
