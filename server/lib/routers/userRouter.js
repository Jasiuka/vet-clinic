import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import { hashPassword } from "../../utils/hash.js";
import express from "express";

let router = express.Router();

router.post(
  "/api/v1/signup",
  tryCatch(async (request, response) => {
    const userObject = request.body;

    hashPassword(userObject.password);
  })
);

export default router;
