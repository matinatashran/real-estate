import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: any) {
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

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can not access to this page!" },
        { status: 403 }
      );
    }

    const profile = await Profile.findOne({ _id: id });
    profile.published = true;
    profile.save()

    return NextResponse.json(
      { message: "Advertisement published successfully!" },
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
