"use client";

import { useEffect, useState } from "react";
import { LuShare } from "react-icons/lu";
import { LiaTelegram } from "react-icons/lia";
import { BsWhatsapp } from "react-icons/bs";
import { TelegramShareButton, WhatsappShareButton } from "react-share";

const ShareButtons = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [pageUrl, setPageUrl] = useState<string>("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  return (
    <div className="absolute bottom-0 right-0">
      <div
        onClick={() => setIsShow(!isShow)}
        className="absolute bottom-5 right-5 w-8 h-8 transition-all duration-300 flex justify-center items-center bg-white rounded-full cursor-pointer z-10"
      >
        <LuShare className="w-5 h-5" />
      </div>
      <TelegramShareButton url={pageUrl}>
        <div
          className={`absolute bottom-5 right-5 w-8 h-8 transition-all duration-500 delay-100 flex justify-center items-center bg-blue-50 rounded-full cursor-pointer ${
            isShow ? "-translate-y-20" : "translate-y-0"
          }`}
        >
          <LiaTelegram className="w-5 h-5 text-blue-500" />
        </div>
      </TelegramShareButton>
      <WhatsappShareButton url={pageUrl}>
        <div
          className={`absolute bottom-5 right-5 w-8 h-8 transition-all duration-500 delay-75 flex justify-center items-center bg-green-50 rounded-full cursor-pointer ${
            isShow ? "-translate-y-10" : "translate-y-0"
          }`}
        >
          <BsWhatsapp className="w-5 h-5 text-green-500" />
        </div>
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
