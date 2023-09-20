"use client";

import { IconType } from "react-icons";
import { useSwiper } from "swiper/react";

interface IProps {
  navigationTo: "prev" | "next";
  IconElement: IconType;
}
const SwiperNavigationButton = ({ navigationTo, IconElement }: IProps) => {
  const swiper = useSwiper();

  return (
    <button
      disabled={
        navigationTo === "next" ? swiper.allowSlideNext : swiper.allowSlidePrev
      }
      onClick={() =>
        navigationTo === "next" ? swiper.slideNext() : swiper.slidePrev()
      }
      className={`transition duration-300 opacity-60 hover:opacity-100 cursor-pointer z-10 disabled:opacity-40 disabled:cursor-auto swiper-custom-${navigationTo}`}
    >
      <IconElement className="w-5 h-5" />
    </button>
  );
};

export default SwiperNavigationButton;
