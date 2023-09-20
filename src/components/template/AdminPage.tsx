// module
import AdminCard from "@/module/AdminCard";
import DashboardPagesTitle from "@/module/DashboardPagesTitle";
import NotExist from "@/module/NotExist";

interface IProps {
  data: any[];
}

const AdminPage = ({ data }: IProps) => {
  return (
    <div className="w-[90%] h-full mx-auto flex flex-col items-center">
      <DashboardPagesTitle title="Advertisements" />
      <div className="w-full flex flex-col gap-5 p-2 md:p-5">
        <div
          className={`w-full flex flex-col gap-8 ${
            data.length ? "justify-center md:justify-start" : "justify-center"
          }`}
        >
          {data.length ? (
            data.map((item, index) => (
              <AdminCard
                key={index}
                id={item._id}
                createdBy={item.userId.email}
                role={item.userId.role}
                title={item.title}
                description={item.description}
                category={item.category}
                adType={item.adType}
                images={item.images}
                updatedAt={new Date(item.updatedAt).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "2-digit", day: "2-digit" }
                )}
              />
            ))
          ) : (
            <NotExist title="There is no advertisement!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
