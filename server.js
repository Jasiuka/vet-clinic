import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import mariadb from "mariadb";
import dotenv from "dotenv";
import { errorHandler } from "./errorHandler.js";
import { tryCatch } from "./tryCatch.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE_NAME,
  connectionLimit: 5,
});
// ///////////
// REVIEWS
// //////////////
const getReviews = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query(
      "SELECT userName,reviewText,stars FROM reviews"
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.end();
  }
};

const postReview = async (reviewText, name, email, stars) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const insertQuery = `INSERT INTO reviews (userName, email, reviewText, stars) VALUES (?,?,?,?)`;
    const values = [name, email, reviewText, stars];

    await connection.query(insertQuery, values);
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.end();
  }
};

app.post(
  "/api/v1/reviews",
  tryCatch(async (request, response) => {
    const userReview = request.body;
    await postReview(
      userReview.reviewText,
      userReview.name,
      userReview.email,
      userReview.rating
    );
    return response.status(200).send("Thank you for your review");
  })
);

app.get(
  "/api/v1/reviews",
  tryCatch(async (_, response) => {
    const reviews = await getReviews();
    response.status(200).send(reviews);
  })
);

// SIGNUP

// Appointments
// SQL Query for getting data
const getNotBookedAppointments = async ({ start, end }) => {
  let connection;
  const query = `SELECT appointments.id,appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE (appointmentDate BETWEEN '${start}' AND '${end}') AND booked = 0`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

// Adds day name to the data object which is sent to FE
const addDayName = (dayNumber) => {
  const dayNamesArray = [
    "Sekmadienis",
    "Pirmadienis",
    "Antradienis",
    "Trečiadienis",
    "Ketvirtadienis",
    "Penktadienis",
    "Šeštadienis",
  ];
  const dayName = dayNamesArray[dayNumber];
  return dayName;
};

app.get(
  "/api/v1/appointments",
  tryCatch(async (request, response) => {
    const searchDates = {
      start: request.query.startDate,
      end: request.query.endDate,
    };
    const foundAppointments = await getNotBookedAppointments(searchDates);
    const addedDayNameAndFoundAppointments = foundAppointments.map(
      (appointment) => {
        const newObject = {
          ...appointment,
          dayName: addDayName(appointment.appointmentDate.getDay()),
        };
        return newObject;
      }
    );

    return response.status(200).send(addedDayNameAndFoundAppointments);
  })
);

// const addAppointments = async (date, time, booked, vet) => {
//   let connection;
//   connection = await pool.getConnection();
//   const query = `INSERT INTO appointments (appointmentDate,appointmentTime,booked,veterinarian) VALUES (?,?,?,?)`;
//   const values = [date, time, booked, vet];
//   await connection.query(query, values);
//   connection.end();
// };

// const createAppointments = async () => {
//   const today = new Date();
//   for (let i = 0; i < 15; i++) {
//     const years = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const day = today.getDate();
//     const fullDate = `${years}-${String(month).padStart(2, 0)}-${String(
//       day
//     ).padStart(2, 0)}`;
//     await addAppointments(fullDate, "10:00", 0, 4);
//     const nextDay = today.getDate() + 1;
//     today.setDate(nextDay);
//     console.log(i);
//     i++;
//   }
// };

app.use(errorHandler);
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
