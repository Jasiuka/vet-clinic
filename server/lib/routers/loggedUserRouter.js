import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import { getAllUserPetsIds } from "../../queries/user/user-queries.js";
import express from "express";

let server = express.Router();

server.get(
  "/api/v1/user/pets",
  tryCatch(async (request, response) => {
    const userAccountId = request.session.userId;
    const pets = await getAllUserPetsIds(pool, userAccountId);
    if (pets.length === 0) return response.status(200).send(0);
    return response.status(200).send(pets);
  })
);

export default server;
