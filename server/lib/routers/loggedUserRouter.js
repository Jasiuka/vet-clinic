import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import { getAllUserPetsIds } from "../../queries/user/user-queries.js";
import { checkUserRole } from "../../utils/helper.js";
import express from "express";
import { checkIfAvailableGenderAndSpecies } from "../../utils/helper.js";
import { getUserIdAndNameByAccountId } from "../../queries/user/user-queries.js";
import { createNewPet } from "../../queries/pets/pets-queries.js";

let router = express.Router();

router.get(
  "/api/v1/user/pets",
  tryCatch(async (request, response) => {
    const userAccountId = request.session.userId;
    const pets = await getAllUserPetsIds(pool, userAccountId);
    if (pets.length === 0) return response.status(200).send(0);
    return response.status(200).send(pets);
  })
);

router.get(
  "/mano-augintiniai",
  checkUserRole([2]),
  tryCatch(async (request, response) => {
    return response.status(200).send();
  })
);

router.post(
  "/api/v1/user/pets",
  checkUserRole([2]),
  tryCatch(async (request, response) => {
    const petDetails = request.body;
    const accountId = request.session.userId;
    const { id } = await getUserIdAndNameByAccountId(pool, accountId);
    petDetails.pet_owner = id;

    const isAvailableSpecieAndGender = checkIfAvailableGenderAndSpecies(
      petDetails.pet_specie,
      petDetails.pet_gender
    );

    if (!isAvailableSpecieAndGender) {
      return response.status(400).send({
        message: "Negalima augintinio lytis arba rūšis!",
        type: "error",
      });
    }

    const isPetCreationSuccess = await createNewPet(
      pool,
      petDetails.pet_name,
      petDetails.pet_specie,
      petDetails.pet_breed,
      petDetails.pet_gender,
      petDetails.pet_age,
      petDetails.pet_weight,
      petDetails.pet_owner
    );

    if (!isPetCreationSuccess) {
      return response.status(400).send({
        message: "Atsiprašome, tačiau įvyko nenumatyta klaida kuriant profilį.",
        type: "error",
      });
    }

    return response.status(200).send({
      message: "Augintinio profilis sėkmingai sukurtas!",
      type: "success",
    });
  })
);

export default router;
