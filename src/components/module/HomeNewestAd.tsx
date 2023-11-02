"use client";
import { FC } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.style.css";

// module
import AdCard from "./AdCard";
import SwiperNavigationButton from "./SwiperNavigationButton";

interface IProps {
  data: any[];
}

const HomeNewestAd: FC<IProps> = ({ data }) => {
  // swiper breakPoints
  const breakPoints = {
    670: { slidesPerView: 2 },
    980: { slidesPerView: 3 },
    1450: { slidesPerView: 4 },
  };

  // swiper navigation
  const navigation = {
    nextEl: ".swiper-custom-next",
    prevEl: ".swiper-custom-prev",
  };

  // swiper pagination
  const pagination = {
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
    el: ".swiper-custom-pagination",
  };

  return (
    <div className="flex flex-col items-start px-2 md:px-10">
      <span className="bg-black text-stone-100 py-2 px-4 rounded-full text-xl md:text-2xl font-bold">
        Newest
      </span>
      <div className="relative w-[94%] ml-5 md:w-full md:mx-5 border-l-[3px] border-black p-5">
        <Swiper
          modules={[Pagination, Navigation, Autoplay, FreeMode]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          speed={1000}
          grabCursor={true}
          spaceBetween={30}
          breakpoints={breakPoints}
          navigation={navigation}
          pagination={pagination}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <AdCard data={item} />
            </SwiperSlide>
          ))}
          <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-3 z-10">
            <SwiperNavigationButton
              navigationTo="prev"
              IconElement={BsFillCaretLeftFill}
            />
            <div className="swiper-custom-pagination swiper-pagination-clickable flex items-center justify-center gap-1 swiper-pagination-bullets swiper-pagination-horizontal">
              <span className="swiper-pagination-bullet"></span>
            </div>
            <SwiperNavigationButton
              navigationTo="next"
              IconElement={BsFillCaretRightFill}
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeNewestAd;
