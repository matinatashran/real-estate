
interface IProps {
  title: string;
}

const DashboardPagesTitle = ({ title }: IProps) => {
  return (
    <div className="sticky top-14 w-full h-10 flex justify-center items-center rounded-md bg-black text-white mt-5 z-10">
      <h2 className="text-lg md:text-xl">{title}</h2>
    </div>
  );
};

export default DashboardPagesTitle;
