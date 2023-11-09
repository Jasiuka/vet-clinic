import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_SERVICE,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

export const mailOptions = (to, subject, emailText) => {
  return {
    from: process.env.MAILER_USER,
    to: to,
    subject: subject,
    text: emailText,
  };
};

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    if (info.messageId) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
