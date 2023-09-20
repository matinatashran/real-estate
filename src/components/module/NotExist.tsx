import Image from "next/image";

// images
import emptyImg from "@/public/images/emptyImg.png";

interface IProps {
  title: string;
}

const NotExist = ({ title }: IProps) => {
  return (
    <div className="w-full h-[calc(100dvh_-_200px)] flex justify-center items-center">
      <div className="w-[90%] md:w-[400px] h-60 md:h-72 rounded-[3rem] grayscale bg-gray-100 shadow-lg m-auto flex flex-col justify-center items-center">
        <Image src={emptyImg} alt="empty" className="w-[120px] md:w-[170px]" />
        <p className="text-gray-600 p-1 rounded-full text-center">{title}</p>
      </div>
    </div>
  );
};

export default NotExist;
