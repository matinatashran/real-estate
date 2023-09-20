import { ReactNode } from "react";
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

interface IProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: IProps) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  try {
    await connectDB();

    const user = await User.findOne({ email: session.user?.email });
    if (!user) return <h3>An error occoured! Please try again.</h3>;

    const profile = await Profile.find({ published: false });

    return (
      <div className="relative flex">
        <DashboardSidebar
          email={user.email}
          role={user.role}
          unPublishedData={profile}
        />
        {children}
      </div>
    );
  } catch (err) {
    return <h3>An error occoured! Please try again.</h3>;
  }
};

export default DashboardLayout;
