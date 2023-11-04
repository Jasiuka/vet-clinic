import { tryCatch } from "../../utils/tryCatch.js";
import {
  getReviews,
  postReview,
} from "../../queries/reviews/reviews-queries.js";
import pool from "../../../server.js";
import express from "express";
let server = express.Router();

server.get(
  "/api/v1/reviews",
  tryCatch(async (_, response) => {
    const reviews = await getReviews(pool);
    response.status(200).send(reviews);
  })
);

server.post(
  "/api/v1/reviews",
  tryCatch(async (request, response) => {
    const userReview = request.body;
    const today = new Date();
    await postReview(
      pool,
      userReview.reviewText,
      userReview.name,
      userReview.email,
      userReview.rating,
      today
    );
    return response.status(200).send("Thank you for your review");
  })
);

export default server;
