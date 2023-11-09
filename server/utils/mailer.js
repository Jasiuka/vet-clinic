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

export const mailOptions = (to, subject, emailText, html = "") => {
  return {
    from: process.env.MAILER_USER,
    to: to,
    subject: subject,
    text: emailText,
    html: html,
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

export const generateProductsHtml = (products) => {
  return products.map((product) => `<h3>${product}</h3>`);
};

export const generateHtmlTemplate = (
  orderId,
  products,
  productsGenerator,
  totalSum
) => {
  const today = new Date();
  return `
  <h1>Sąskaita faktūra</h1>
  <p>Užsakymo numeris - ${orderId} </p>
  <p>Užsakymo data: ${today}</p>
  <br>
  <br>
  <br>
  <h2>Jūsų užsakytos prekės</h2>
  ${productsGenerator(products)}
  <br>
  <br>
  <br>
  <h2>Bendra suma: ${totalSum}</h2>
  `;
};
