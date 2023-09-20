import { NextRequest, NextResponse } from "next/server";

// models
import User from "@/models/User";

// utils
import { validation } from "@/utils/validation";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { email, newPassword } = await req.json();
    const emptyErr = validation([email], "NOT_EMPTY");
    const emailErr = validation(email, "EMAIL");
    if (emptyErr || emailErr) {
      return NextResponse.json(
        { error: emptyErr || emailErr },
        { status: 422 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email incorrect!" }, { status: 422 });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.save();

    return NextResponse.json(
      { message: "Password changed successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occoured in server!" },
      { status: 500 }
    );
  }
}
