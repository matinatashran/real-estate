import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// layout
import DashboardSidebar from "@/layout/DashboardSidebar";

// utils
import connectDB from "@/utils/connectDB";

// models
import User from "@/models/User";
import Profile from "@/models/Profile";

// template
import AdminPage from "@/template/AdminPage";

// utils
import { sortByLastestUpdate } from "@/utils/functions";
import getImages from "@/utils/getImages";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  await connectDB();

  const user = await User.findOne({ email: session.user?.email });
  if (!user) return <h3>An error occoured! Please try again.</h3>;
  if (user.role !== "ADMIN") return redirect("/dashboard");

  let profiles: any = await Profile.find({ published: false }).populate(
    "userId",
    ["email", "role"]
  );

  profiles = sortByLastestUpdate(JSON.parse(JSON.stringify(profiles)));
  profiles = profiles.map((item: any) => {
    return { ...item, images: getImages(item.category) };
  });

  return (
    <div className="relative flex">
      <DashboardSidebar
        email={user.email}
        role={user.role}
        unPublishedData={profiles}
      />
      <AdminPage data={profiles} />
    </div>
  );
};

export default Admin;

export async function generateMetadata(): Promise<Metadata | undefined> {
  const session = await getServerSession(authOptions);
  return {
    title: "Admin",
    description: `${session?.user?.email} - Admin Page for advertisements management.`,
  };
}
