"use client";

import { useState } from "react";
import Image from "next/image";

// utils
import { ImageListType } from "@/utils/getImages";

interface IProps {
  images: ImageListType;
  defaultIndex?: number;
}

const ImageSlider = ({ images, defaultIndex }: IProps) => {
  const [imgIndex, setImgIndex] = useState<number>(defaultIndex || 0);

  return (
    <div className="relative">
      <div className="relative w-full h-[300px] md:h-[400px] flex justify-center items-center border-[13px] border-stone-200 rounded-[3rem] md:rounded-[4rem] overflow-hidden">
        {images.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt="real estate"
            className={`absolute top-0 left-0 w-full h-full rounded-[2rem] md:rounded-[3rem] transition-all duration-500 ${imgIndex === index ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-3 ">
        {images.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt="real estate"
            onClick={() => setImgIndex(index)}
            className={`w-9 h-9 cursor-pointer transition-all duration-500 ${
              imgIndex === index ? "scale-125 rounded-[50%] mx-1.5" : "rounded-md"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
