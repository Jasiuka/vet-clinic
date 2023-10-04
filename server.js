import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE_NAME,
  connectionLimit: 5,
});

const getReviews = async () => {
  let conn;
  conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT userName,reviewText,stars FROM reviews"
  );
  conn.end();
  return rows;
};

const postReview = async (reviewText, name, email, stars) => {
  let conn;

  conn = await pool.getConnection();
  const insertQuery = `INSERT INTO reviews (userName, email, reviewText, stars) VALUES (?,?,?,?)`;
  const values = [name, email, reviewText, stars];

  conn.query(insertQuery, values);
  conn.end();
};

app.get("/api/v1/reviews", async (_, res) => res.send(await getReviews()));
app.post("/api/v1/reviews", (request, response) => {
  const userReview = request.body;
  postReview(
    userReview.reviewText,
    userReview.name,
    userReview.email,
    userReview.rating
  );
  response.end("Success!");
});
