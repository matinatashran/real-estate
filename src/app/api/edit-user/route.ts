import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";

// middleware
import validate from "@/middleware/validate";

// validation-schema
import { editUserSchema } from "@/validation-schema/authForm";

async function patch(req: NextRequest) {
  try {
    await connectDB();
    const { firstname, lastname, email } = await req.json();

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

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.save();

    return NextResponse.json(
      { message: "User's information edited successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An occoured error! Please try again." },
      { status: 500 }
    );
  }
}

export const PATCH = validate(editUserSchema, patch);
