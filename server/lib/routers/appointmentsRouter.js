import {
  getAppointmentById,
  getNotBookedAppointments,
  bookPet,
} from "../../queries/appointments/appointments-queries.js";
import { tryCatch } from "../../utils/tryCatch.js";
import {
  addsDayNamePropertyToEveryAppointment,
  addDayName,
} from "../../utils/helper.js";
import pool from "../../../server.js";
import express from "express";
import {
  getPetByPetIdAndUserId,
  createNewPet,
} from "../../queries/pets/pets-queries.js";
import { getUserEmail } from "../../queries/user/user-queries.js";
import {
  mailOptions,
  sendEmail,
  generateAppointmentBookingHtml,
} from "../../utils/mailer.js";

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
    const singleAppointment = await getAppointmentById(pool, id);
    const singleAppointmentWithAddedDayName = {
      ...singleAppointment,
      dayName: addDayName(singleAppointment.appointmentDate.getDay()),
    };

    return response.status(200).send(singleAppointmentWithAddedDayName);
  })
);

router.post(
  "/api/v1/appointments",
  tryCatch(async (request, response) => {
    const {
      appointmentId,
      petId,
      species,
      breed,
      age,
      gender,
      description: reason,
      email,
    } = request.body;
    const isAuthUser = request.session.userId;

    // Last check if appointment is still free
    const isAppointmentFree = await getAppointmentById(pool, appointmentId);
    if (isAppointmentFree.pet)
      return response.status(400).send({
        message: "Deja šis vizitas jau buvo užregistruotas.",
      });

    // If petId = auth user
    if (petId) {
      // Check if user is authenticated
      if (!isAuthUser) {
        return response.status(400).send({
          message: "Klaida. Duomenys netikri.",
        });
      }

      // Check if user have such pet
      const doesUserHaveThisPet = await getPetByPetIdAndUserId(
        pool,
        petId,
        isAuthUser
      );

      if (!doesUserHaveThisPet)
        return response.status(400).send({
          message: "Klaida. Jūs šio augintinio neturite.",
        });

      await bookPet(pool, appointmentId, petId, reason);

      console.log(email);
      const emailOptions = mailOptions(
        email,
        "Vizito registracija",
        "",
        generateAppointmentBookingHtml(
          isAppointmentFree.vetName,
          isAppointmentFree.lastName,
          isAppointmentFree.appointmentDate,
          isAppointmentFree.appointmentTime
        )
      );
      await sendEmail(emailOptions);
      return response.status(200).send({
        message: "Sėkmingai užregistravote augintinį vizitui.",
      });
    }

    // If no petId = not auth user / auth user (without pet profiles)
    const newPetId = await createNewPet(
      pool,
      null,
      species,
      breed,
      gender,
      age,
      null,
      null
    );
    const bookingResult = await bookPet(
      pool,
      appointmentId,
      newPetId[0].id,
      reason
    );
    if (!bookingResult)
      return response.status(400).send({
        message: "Klaida. Bandykite dar kartą.",
      });

    const emailOptions = mailOptions(
      email,
      "Vizito registracija",
      "",
      generateAppointmentBookingHtml(
        isAppointmentFree.vetName,
        isAppointmentFree.lastName,
        isAppointmentFree.appointmentDate,
        isAppointmentFree.appointmentTime
      )
    );
    await sendEmail(emailOptions);
    return response.status(200).send({
      message: "Sėkmingai užsiregistravote vizitui.",
    });
  })
);

export default router;
