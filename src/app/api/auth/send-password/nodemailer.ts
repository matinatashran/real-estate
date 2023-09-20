import nodemailer from "nodemailer";

const { EMAIL, EMAIL_PASS } = process.env;

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
