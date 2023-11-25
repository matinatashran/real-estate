import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

// template
import DashboardPage from "@/template/DashboardPage";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session?.user?.email }).select([
    "firstname",
    "lastname",
  ]);

  return <DashboardPage data={user} />;
};

export default Dashboard;

export async function generateMetadata(): Promise<Metadata | undefined> {
  const session = await getServerSession(authOptions);
  return {
    title: `Dashboard | ${session?.user?.email}`,
    description: `${session?.user?.email} dashboard page.`,
  };
}
