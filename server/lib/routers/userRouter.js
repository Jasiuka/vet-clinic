import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import { hashPassword, validatePassword } from "../../utils/hash.js";
import { mailOptions, sendEmail } from "../../utils/mailer.js";
import {
  findUser,
  findUserEmail,
  createUserAccount,
  createUser,
} from "../../queries/user/user-queries.js";

import express from "express";

let router = express.Router();

router.post(
  "/api/v1/signup",
  tryCatch(async (request, response) => {
    const { email, password, ...userObject } = request.body;

    const isEmailExist = await findUserEmail(pool, email);
    if (isEmailExist)
      return response.status(409).send({
        message: "Šis el. paštas jau egzistuoja.",
      });

    const createdAccountId = await createUserAccount(
      pool,
      email,
      await hashPassword(password),
      3
    );

    if (!createdAccountId) {
      return response.status(400).send({
        message: "Klaida kuriant paskyrą.",
      });
    }

    const isCreatingUserSuccess = await createUser(
      pool,
      userObject,
      createdAccountId
    );

    if (!isCreatingUserSuccess)
      return response.status(400).send({
        message: "Klaida kuriant profilį.",
      });

    const emailOptions = mailOptions(
      email,
      "Registracija",
      "Jūsų registracija sėkminga!"
    );

    const isEmailSuccess = await sendEmail(emailOptions);
    if (!isEmailSuccess)
      return response.status(400).send({
        message: "Sistemos klaida. Bandykite dar kartą.",
      });

    return response.status(200).send({
      message: "Vartotojas sukurtas. Žinutė į paštą išsiųsta.",
    });
  })
);

router.post(
  "/api/v1/login",
  tryCatch(async (request, response) => {
    const { email, password } = request.body;

    const userData = await findUser(pool, email);

    if (!userData)
      return response.status(400).send({
        message: "Toks vartotojas neegzistuoja.",
      });

    const isPasswordMatch = await validatePassword(
      password,
      userData[0].accountPassword
    );
    if (!isPasswordMatch) {
      return response
        .status(400)
        .send("Klaida el. paštas arba slaptažodis klaidingas");
    }

    request.session.userId = userData[0].id;
    const userRole = {
      role: userData[0].userRole,
    };
    return response.status(200).send(userRole);
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
