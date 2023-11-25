import { NextResponse } from "next/server";

// models
import User from "@/models/User";

// utils
import connectDB from "@/utils/connectDB";

// .
import getMailData from "./nodemailer";
import VerifyComponent from "./verify-component";

// middleware
import validate from "@/middleware/validate";

// validation-schema
import { emailFormSchema } from "@/validation-schema/authForm";

async function post(body: any) {
  try {
    await connectDB();

    const { email } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email incorrect!" }, { status: 422 });
    }

    const { transporter, mailOptions, OTPCode } = getMailData(email);
    await transporter.sendMail({
      ...mailOptions,
      subject: "Forget Password",
      html: VerifyComponent(email, OTPCode),
    });

    return NextResponse.json(
      { message: `Sent password to ${email}`, OTP: OTPCode },
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

export const POST = validate(emailFormSchema, post);
