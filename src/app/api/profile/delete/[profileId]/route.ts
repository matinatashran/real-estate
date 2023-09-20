import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// utils
import connectDB from "@/utils/connectDB";

// models
import User from "@/models/User";
import Profile from "@/models/Profile";

export async function DELETE(req: NextRequest, context: any) {
  try {
    await connectDB();

    const id = context.params.profileId;

    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Access Denied!" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist!" },
        { status: 404 }
      );
    }

    const profile = await Profile.findOne({ _id: id });
    if (!user._id.equals(profile.userId) && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can not access to this!" },
        { status: 403 }
      );
    }

    await Profile.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Your advertisement deleted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An Error accoured in server!" },
      { status: 500 }
    );
  }
}
