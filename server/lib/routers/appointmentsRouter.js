import {
  getAppointmentById,
  getNotBookedAppointments,
} from "../../queries/appointments/appointments-queries.js";
import { tryCatch } from "../../utils/tryCatch.js";
import {
  addsDayNamePropertyToEveryAppointment,
  addDayName,
} from "../../utils/helper.js";
import pool from "../../../server.js";
import express from "express";

let router = express.Router();

router.get(
  "/api/v1/appointments",
  tryCatch(async (request, response) => {
    const searchDates = {
      start: request.query.startDate,
      end: request.query.endDate,
    };
    const foundAppointments = await getNotBookedAppointments(pool, searchDates);
    const appointments =
      addsDayNamePropertyToEveryAppointment(foundAppointments);
    return response.status(200).send(appointments);
  })
);

router.get(
  "/api/v1/appointments/id",
  tryCatch(async (request, response) => {
    const id = request.query.id;
    const result = await getAppointmentById(pool, id);
    const singleAppointment = result[0];
    const singleAppointmentWithAddedDayName = {
      ...singleAppointment,
      dayName: addDayName(singleAppointment.appointmentDate.getDay()),
    };

    return response.status(200).send(singleAppointmentWithAddedDayName);
  })
);

export default router;
