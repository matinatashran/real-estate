"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// images
import auhtPageImg from "@/public/images/authPageImg.png";

// utils
import authPageParameters from "@/utils/authPageParameters";

interface IProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  const pathname = usePathname();
  const page = authPageParameters(pathname);

  return (
    <div className="relative w-[95%] lg:w-[80%] lg:h-[calc(100dvh_-_120px)] flex flex-col items-center gap-10 m-auto rounded-2xl bg-stone-100 p-5 ">
      <div className="flex flex-col items-center gap-5 justify-center">
        <h1 className="text-3xl lg:text-5xl mt-3 font-sans">{page.title}</h1>
        <p className="text-sm text-gray-400 text-center">{page.subTitle}</p>
      </div>
      <div className="relative w-[95%] xl:w-[80%] h-[500px] md:h-[400px] m-auto">
        <div className="absolute bg-stone-100 rounded-full w-[160px] md:w-[250px] lg:w-[350px] -top-8 right-1/2 -mr-[80px] md:-right-8 lg:-right-16 md:mr-auto flex justify-center z-10">
          <Image src={auhtPageImg} alt="real estate" className="w-full" />
        </div>
        <div className="relative w-full h-full bg-white rounded-3xl p-5 flex flex-col justify-center overflow-hidden">
          {children}
          {pathname !== "/forget-password" && (
            <div className="w-[210px] lg:w-[240px] absolute -bottom-9 text-center bg-gray-700 rounded-2xl right-1/2 -mr-[105px] md:mr-auto md:right-7 flex flex-col items-center gap-2 justify-end max-h-[10] hover:-translate-y-12 py-2 px-1 transition duration-500">
              <span className="text-sm text-white">{page.spanText}</span>
              <Link
                href={page.linkHref}
                className="text-sm px-3 py-1 bg-white text-gray-700 lg:font-semibold rounded-md"
              >
                {page.linkText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
