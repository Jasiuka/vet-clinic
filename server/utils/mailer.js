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
  return products.map(
    (product) =>
      `<div style="border-bottom: 4px double #dedede;"><h3 style="font-size:18px;font-weight:400">${product?.title} x ${product?.quantity} vnt</h3> <p style="font-weight:600; font-size:16px; color:#f89fbe">${product?.price}€/vnt</p></div>`
  );
};

// Generates html template for invoice
export const generateHtmlTemplate = (
  orderId,
  products,
  productsGenerator,
  totalSum,
  paymentType,
  shippingType,
  fullName
) => {
  const payment =
    paymentType === ""
      ? "Atsiskaitymas grynais arba bankine kortele vietoje"
      : "Atsiskaitymas kortele internetu";
  const shipping =
    shippingType === 0
      ? "Atsiėmimas klinikoje"
      : "Pristatymas kurjeriu nurodytu adresu";
  const today = new Date();
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  return `
  <div style="color:#212529">
    <h1>Sąskaita faktūra</h1>
    <p style="text-transform: uppercase; font-size:14px">Užsakymo numeris - <span style="font-weight: 600" >${orderId}</span> </p>
    <p style="text-transform: uppercase; font-size:14px">Užsakymo data: <span style="font-weight: 600" >${todayDate}</span></p>
    <p style="text-transform: uppercase; font-size:14px">Kas užsakė: <span  style="font-weight: 600">${fullName}</span></p>
    <br>
    <br>
    <br>
    <h2>Jūsų užsakytos prekės</h2>
    ${productsGenerator(products)}
    <br>
    <br>
    <br>
    <h3>Pristatymo būdas: ${shipping}</h3>
    <h3>Apmokėjimas: ${payment}</h3>
    <h2>Bendra suma: ${totalSum}€</h2>
  </div>

  `;
};

// Generates appointment booking success email message

export const generateAppointmentBookingHtml = (
  vetName,
  vetLastName,
  appointmentDate,
  appointmentTime
) => {
  const formatedDate = `${appointmentDate.getFullYear()}-${
    appointmentDate.getMonth() + 1
  }-${appointmentDate.getDate()}`;
  return `
    <h1>Sėkmingai užsiregistravote vizitui.</h1>
    <div style="font-weight:400; color:#212529 ">
    <h2>Vizito data: <span style="font-weight:500; color:#f89fbe">${formatedDate}</span></h2>
    <h2>Vizito laikas: <span style="font-weight:500; color:#f89fbe" >${appointmentTime}</span></h2>
    <h2>Pas vet. Gydytoją: <span style="font-weight:500; color:#f89fbe" >${
      vetName + " " + vetLastName
    }</span></h2>
    </div>
    <h3>Jei dėl kokių priežaščių negalėsite atvykti, praneškite telefonu: <span style="font-weight:500; color:#f89fbe" >+37063297569</span>, dieną prieš vizitą. </h3>
    <h2>Lausime jūsų atvykstant!</h2>
  `;
};
