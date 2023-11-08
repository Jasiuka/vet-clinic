import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import { getAllUserPetsIds } from "../../queries/user/user-queries.js";
import { checkUserRole } from "../../utils/helper.js";
import express from "express";

let router = express.Router();

router.get(
  "/api/v1/user/pets",
  tryCatch(async (request, response) => {
    const userAccountId = request.session.userId;
    const pets = await getAllUserPetsIds(pool, userAccountId);
    if (pets.length === 0) return response.status(200).send(0);
    return response.status(200).send(pets);
  })
);

router.get(
  "/mano-augintiniai",
  checkUserRole([2]),
  tryCatch(async (request, response) => {
    return response.status(200);
  })
);

export default router;
