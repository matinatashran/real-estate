import Link from "next/link";
import { IconType } from "react-icons/lib";

interface IProps {
  title: string;
  IconElement: IconType;
}

const HomeCategoryIcon = ({ title, IconElement }: IProps) => {
  return (
    <Link
      href={{
        pathname: "/advertisements",
        query: { category: title.toLowerCase() },
      }}
      className="w-52 h-52 md:w-60 md:h-60 flex flex-col justify-center items-center gap-3 rounded-[50%_/_25%] bg-category-gradiant"
    >
      <IconElement className="w-28 h-28 md:w-36 md:h-36" />
      <span className="font-semibold md:text-lg">{title}</span>
    </Link>
  );
};

export default HomeCategoryIcon;
