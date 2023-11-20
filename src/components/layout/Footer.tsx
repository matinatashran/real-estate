"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// images
import logo from "@/public/images/real-estate-logo.jpg";

const Footer = () => {
  const session = useSession();
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 p-5 md:p-10 bg-stone-200 mt-40">
      <div className="flex flex-col gap-3 items-center md:items-start">
        <span className="font-bold text-lg md:text-xl">Real Estate</span>
        <p className="text-sm max-w-[400px] text-gray-600 text-center md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, porro
          recusandae quam maiores accusantium mollitia, provident debitis vitae
          impedit in voluptatum, odit saepe incidunt beatae esse optio minus
          veritatis architecto!
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center md:items-start">
        <span className="font-bold text-lg md:text-xl">Menu</span>
        <ul className="w-full flex flex-col items-center md:items-start gap-5">
          <li>
            <Link href="/" className="text-sm text-gray-600">
              Home
            </Link>
          </li>
          <li className="md:mr-10">
            <Link href="/advertisements" className="text-sm text-gray-600">
              Advertisements
            </Link>
          </li>
          {session.status !== "authenticated" && (
            <>
              <li>
                <Link href="/login" className="text-sm text-black">
                  Login
                </Link>
              </li>
              <li className="flex">
                <Link
                  href="/register"
                  className="w-full text-center text-sm text-black border border-black py-1 px-3 rounded-full"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="max-w-[300px] h-[250px] rounded-[2rem] p-5 bg-white border-2 border-black flex items-center">
        <Image src={logo} alt="real estate" className="w-full h-fit" />
      </div>
    </div>
  );
};

export default Footer;
