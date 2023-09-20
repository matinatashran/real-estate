import { NextRequest, NextResponse } from "next/server";

// models
import User from "@/models/User";

// utils
import { validation } from "@/utils/validation";
import connectDB from "@/utils/connectDB";

// .
import getMailData from "./nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();
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

    const { transporter, mailOptions, randomCode } = getMailData(email);
    await transporter.sendMail({
      ...mailOptions,
      subject: "Forget Password",
      text: `Your verify password is "${randomCode}"`,
    });

    return NextResponse.json(
      { message: `Sent password to ${email}`, OTP: randomCode },
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
