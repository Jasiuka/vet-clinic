import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import express from "express";
import { createFile, downloadFileById } from "../../utils/storage-api.js";
import { createNewPetDocument } from "../../queries/pets/pets-queries.js";
import { createTodayDateAndTimeString } from "../../utils/helper.js";
import { checkUserRole } from "../../utils/helper.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/api/v1/files/upload",
  upload.single("file"),
  checkUserRole([3]),
  tryCatch(async (request, response) => {
    const file = request.file;
    const { title, petId } = request.body;

    const fileId = await createFile(file);

    if (title.trim() === "") {
      return response.status(400).send({
        message: "Neįrašytas dokumento pavadinimas!",
        type: "error",
      });
    }

    if (!fileId) {
      return response.status(400).send({
        message: "Įvyko klaida įkeliant failą",
        type: "error",
      });
    }

    const date = createTodayDateAndTimeString();
    const isQuerySuccess = await createNewPetDocument(
      pool,
      fileId,
      title,
      petId,
      date
    );
    if (isQuerySuccess) {
      return response.status(200).send({
        message: "Failo įkėlimas sėkmingas",
        status: 200,
        type: "success",
      });
    } else {
      return response.status(400).send({
        message: "Įvyko klaida įkeliant failą",
        status: 400,
        type: "error",
      });
    }
  })
);

router.get(
  "/api/v1/files/download",
  tryCatch(async (request, response) => {
    const fileId = request.query.fileId;

    const link = await downloadFileById(fileId);

    response.status(200).send({
      link: link,
    });
  })
);

export default router;
