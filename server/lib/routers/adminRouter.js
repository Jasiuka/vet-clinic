import pool from "../../../server.js";
import express from "express";
import { tryCatch } from "../../utils/tryCatch.js";
import { findUser } from "../../queries/user/user-queries.js";
import { validatePassword } from "../../utils/hash.js";
import { admin } from "googleapis/build/src/apis/admin/index.js";

const router = express.Router();

router.post(
  "/api/v1/admin/login",
  tryCatch(async (request, response) => {
    const { email, password } = request.body;
    const adminUser = await findUser(pool, email);
    if (!adminUser.length) {
      return response.status(400).send();
    }

    const passwordMatch = await validatePassword(
      password,
      adminUser[0].accountPassword
    );

    if (!passwordMatch) {
      return response.status(400).send();
    }

    request.session.accountId = adminUser[0].id;
    return response.status(200).send({ user: email, super: true });
  })
);

export default router;
