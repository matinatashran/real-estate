import { MdVilla, MdOutlineApartment } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { SiOnlyoffice } from "react-icons/si";
import { HiOutlineDevicePhoneMobile as MobileIcon } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";

// module
import ShowAdData from "@/module/ShowAdData";
import ShowAdPicture from "@/module/ShowAdPicture";

// utils
import { ImageListType } from "@/utils/getImages";

interface IAdverType {
  title: string;
  description: string;
  address: string;
  phone: string;
  price: number;
  companyName: string;
  category: string;
  adType: string;
  welfareAmenities: string[];
  rules: string[];
  constructionDate: Date;
  updatedAt: Date;
  images: ImageListType;
}

interface IProps {
  data: IAdverType;
}

const categoryIcons: any = {
  villa: <MdVilla className="text-stone-200 w-[90%] h-[90%]" />,
  apartment: <MdOutlineApartment className="text-stone-200 w-[90%] h-[90%]" />,
  shop: <FaStore className="text-stone-200 w-[90%] h-[90%]" />,
  office: <SiOnlyoffice className="text-stone-200 w-[90%] h-[90%]" />,
};

const AdvertisementDetailPage = ({
  data: {
    title,
    description,
    address,
    phone,
    price,
    companyName,
    category,
    adType,
    welfareAmenities,
    rules,
    constructionDate,
    updatedAt,
    images,
  },
}: IProps) => {
  return (
    <div className="xl:container relative flex flex-col-reverse lg:flex-row w-[calc(100vw_-_26px)] lg:w-[calc(100vw_-_102px)] lg:h-[calc(100dvh_-_102px)] m-auto rounded-3xl overflow-hidden mb-10 lg:mb-auto">
      <div className="w-full lg:w-1/2 bg-stone-200 relative flex flex-col justify-between gap-7 p-5 pt-12 lg:pt-24 overflow-auto">
        <div className="flex flex-col gap-7">
          <div className="absolute w-10 h-10 md:w-14 md:h-14 top-5 right-4 lg:left-5 bg-black flex justify-center items-center rounded-full p-1">
            {categoryIcons[category]}
          </div>
          <ShowAdData title="features" data={welfareAmenities} />
          <ShowAdData title="rules" data={rules} />
          <ShowAdData title="description" data={description} />
          <ShowAdData title="address" data={address} />
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MdRealEstateAgent className="w-5 h-5" />
              <span className="text-sm">{companyName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MobileIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">{phone}</span>
            </div>
          </div>
          <div className="text-center py-1 px-2 text-xs font-semibold bg-black text-stone-200 rounded-md">
            {new Date(updatedAt)
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .toString()}
          </div>
        </div>
      </div>
      <ShowAdPicture
        adTitle={title}
        adType={adType}
        price={price}
        constructionYear={new Date(constructionDate).toLocaleDateString(
          "en-US",
          { year: "numeric" }
        )}
        images={images}
      />
    </div>
  );
};

export default AdvertisementDetailPage;
