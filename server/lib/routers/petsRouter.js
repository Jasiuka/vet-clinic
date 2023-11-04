import {
  getPetHistoryById,
  getPetById,
  getAllPetAppointmentsById,
  getPetDocumentsById,
} from "../../queries/pets/pets-queries.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express";
import pool from "../../../server.js";
let server = express.Router();

server.get(
  "/api/v1/pets/appointments/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const appointments = await getAllPetAppointmentsById(pool, id);
    return response.status(200).send(appointments);
  })
);

server.get(
  "/api/v1/pets/history/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetHistoryById(pool, id);
    return response.status(200).send(result);
  })
);

server.get(
  "/api/v1/pets/documents/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetDocumentsById(pool, id);
    return response.status(200).send(result);
  })
);

server.get(
  "/api/v1/pets/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getPetById(pool, id);
    return response.status(200).send(result);
  })
);

export default server;
