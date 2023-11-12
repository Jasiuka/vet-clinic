import { tryCatch } from "../../utils/tryCatch.js";
import {
  getReviews,
  postReview,
} from "../../queries/reviews/reviews-queries.js";
import pool from "../../../server.js";
import express from "express";
import {
  getUserIdAndNameByAccountId,
  updateUserReview,
} from "../../queries/user/user-queries.js";
let router = express.Router();

router.get(
  "/api/v1/reviews",
  tryCatch(async (_, response) => {
    const reviews = await getReviews(pool);
    response.status(200).send(reviews);
  })
);

router.post(
  "/api/v1/reviews",
  tryCatch(async (request, response) => {
    const accountId = request.session.userId;
    const userReview = request.body;
    const today = new Date();
    const user = await getUserIdAndNameByAccountId(pool, accountId);

    const reviewId = await postReview(
      pool,
      userReview.reviewText,
      user.userName,
      userReview.rating,
      today
    );
    await updateUserReview(pool, reviewId.id, user.id);
    return response.status(200).send({
      message: "Ačiū už jūsų atsiliepimą!",
    });
  })
);

export default router;
