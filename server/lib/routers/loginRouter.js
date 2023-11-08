import { tryCatch } from "../../utils/tryCatch.js";
import { findUser, validatePassword } from "../../queries/user/user-queries.js";
import pool from "../../../server.js";
import express from "express";
let router = express.Router();

router.post(
  "/api/v1/login",
  tryCatch(async (request, response) => {
    const { email, password } = request.body;

    const userData = await findUser(pool, email);

    if (userData) {
      if (validatePassword(userData[0].accountPassword, password)) {
        request.session.userId = userData[0].id;
        const userRole = {
          role: userData[0].userRole,
        };
        return response.status(200).send(userRole);
      }
      console.log("Not validated");
      return response
        .status(400)
        .send("Klaida el. paštas arba slaptažodis klaidingas");
    }
  })
);

router.get(
  "/logout",
  tryCatch(async (request, response) => {
    request.session.destroy();
    return response.status(200).send({
      message: "Logout successful",
    });
  })
);

export default router;
