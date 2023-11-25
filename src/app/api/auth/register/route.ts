import { NextResponse } from "next/server";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

// middleware
import validate from "@/middleware/validate";

// validation-schema
import { registerSchema } from "@/validation-schema/authForm";

async function post(body: any) {
  try {
    await connectDB();
    const { email, password, firstname, lastname } = body;

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

export const POST = validate(registerSchema, post);
