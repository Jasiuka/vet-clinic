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
const getNotBookedAppointments = async ({ start, end }) => {
  let connection;
  const query = `SELECT * FROM appointments WHERE (appointmentDate BETWEEN '${start}' AND '${end}') AND booked = 0`;
  connection = await pool.getConnection();
  const results = await connection.query(query);
  connection.end();
  return results;
};

app.get(
  "/api/v1/appointments",
  tryCatch(async (request, response) => {
    const searchDates = {
      start: request.query.startDate,
      end: request.query.endDate,
    };
    console.log("search dates", searchDates);
    const foundAppointments = await getNotBookedAppointments(searchDates);
    console.log(foundAppointments);
    return response.status(200).send(foundAppointments);
  })
);

app.use(errorHandler);
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
