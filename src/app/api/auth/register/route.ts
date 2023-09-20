import { NextRequest, NextResponse } from "next/server";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";
import { validation } from "@/utils/validation";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, firstname, lastname } = await req.json();
    const emptyErr = validation([email, password], "NOT_EMPTY");
    const emailErr = validation(email, "EMAIL");
    const passwordErr = validation(password, "PASSWORD");

    if (emptyErr || emailErr || passwordErr) {
      return NextResponse.json(
        { error: emptyErr || emailErr || passwordErr },
        { status: 422 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "This Email already exists!" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      email,
      password: hashedPassword,
      firstname: firstname || "",
      lastname: lastname || "",
    });

    return NextResponse.json(
      { message: "Your account created successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occoured in server!" },
      { status: 500 }
    );
  }
}
