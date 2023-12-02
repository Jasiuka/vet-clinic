import {
  getPetHistoryById,
  getPetById,
  getAllPetAppointmentsById,
  getPetDocumentsById,
  createNewDiagnosis,
} from "../../queries/pets/pets-queries.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express";
import pool from "../../../server.js";
import {
  createTodayDateAndTimeString,
  checkUserRole,
} from "../../utils/helper.js";

let router = express.Router();

router.get(
  "/api/v1/pets/appointments/id",
  checkUserRole([2, 3]),
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const appointments = await getAllPetAppointmentsById(pool, id);
    if (!appointments[0].Vardas) {
      return response.status(200).send([]);
    }
    return response.status(200).send(appointments);
  })
);

router.get(
  "/api/v1/pets/history/id",
  checkUserRole([2, 3]),
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetHistoryById(pool, id);
    return response.status(200).send(result);
  })
);

router.get(
  "/api/v1/pets/documents/id",
  checkUserRole([2, 3]),
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetDocumentsById(pool, id);
    if (!result[0].title) {
      return response.status(200).send([]);
    }
    return response.status(200).send(result);
  })
);

router.get(
  "/api/v1/pets/id",
  checkUserRole([2, 3]),
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetById(pool, id);
    return response.status(200).send(result);
  })
);

router.post(
  "/api/v1/pets/history",
  checkUserRole([3]),
  tryCatch(async (request, response) => {
    const { description, petId } = request.body;

    const today = createTodayDateAndTimeString();
    const isCreatingSuccess = await createNewDiagnosis(
      pool,
      today.date,
      description,
      petId
    );

    if (!isCreatingSuccess) {
      return response.status(400).send({
        message: "Įvyko klaida pridedant diagnozę!",
        status: 400,
      });
    }

    return response.status(200).send({
      message: "Diagnozė sėkmingai pridėta",
      status: 200,
    });
  })
);

export default router;
