import { tryCatch } from "../../utils/tryCatch.js";
import { findUser } from "../../queries/user/user-queries.js";
import pool from "../../../server.js";
import express from "express";
let server = express.Router();

server.post(
  "/api/v1/user/login/",
  tryCatch(async (request, response) => {
    const { email, password } = request.body;

    const userData = await findUser(pool, email);

    // const singleObject = mergePetsIntoSingleProperty(userData);

    const doesPasswordsMatch = userData[0].accountPassword === password;

    if (doesPasswordsMatch) {
      if (userData[0].userRole === 1) {
        return response.status(200).send(userData[0]);
      }
      return response.status(200).send(userData[0]);
    }
    return response.status(400).send("Klaida, slaptažodžiai nesutampa");
  })
);

export default server;
