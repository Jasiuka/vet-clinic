import { getVetAppointments } from "../../queries/vets/vets-queries.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express";
import pool from "../../../server.js";

let router = express.Router();

router.get(
  "/api/v1/vet/appointments/",
  tryCatch(async (request, response) => {
    const vetAppointments = await getVetAppointments(pool);
    return response.status(200).send(vetAppointments);
  })
);

export default router;
