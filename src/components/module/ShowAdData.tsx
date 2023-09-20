import { RiVipDiamondFill } from "react-icons/ri";

interface IProps {
  title: string;
  data: string[] | string;
}

const ShowAdData = ({ title, data }: IProps) => {
  return (
    <div className={`flex flex-col gap-2 ${data.length ? "block" : "hidden"}`}>
      <span className="font-semibold text-sm border-l-[3px] border-black pl-2">
        {title.toUpperCase()}
      </span>
      {typeof data === "object" ? (
        <div className="ml-5 grid grid-cols-2 gap-5">
          {data.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <RiVipDiamondFill className="text-black w-3 h-3 min-w-[12px] min-h-[12px] mt-0.5" />
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-5 text-sm text-gray-600">{data}</p>
      )}
    </div>
  );
};

export default ShowAdData;
