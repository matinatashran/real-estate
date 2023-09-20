import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-[95%] md:w-[80%] h-[80vh] bg-home m-auto rounded-[2rem] flex flex-col md:justify-center items-start gap-20 pl-10">
      <h1 className="text-3xl md:text-5xl font-bold leading-[50px] md:leading-[70px] mt-16 md:mt-0">
        Choose <br />
        Your Favorite <br /> Home
      </h1>
      {!session && (
        <Link
          href="/login"
          className="py-2 px-5 rounded-full bg-black text-white hover:opacity-80 transition duration-300"
        >
          Get Started
        </Link>
      )}
    </div>
  );
};

export default Header;
