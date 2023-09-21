// ./
import nodemailer from "nodemailer";

// enum
import { EMAIL_OPTIONS } from "@/enum/email.enum";

const { EMAIL, EMAIL_PASS } = EMAIL_OPTIONS;

function getMailData(sendTo: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: sendTo,
  };

  const randomCode = `${Math.floor(100000 + Math.random() * 900000)}`;

  return { transporter, mailOptions, randomCode };
}

export default getMailData;
