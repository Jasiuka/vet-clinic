import { getAllServices } from "../../queries/website/website-queries.js";
import { mergeCategoriesIntoSingleProperty } from "../../utils/helper.js";
import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import express from "express";

let router = express.Router();

router.get(
  "/api/v1/services",
  tryCatch(async (request, response) => {
    const allServices = await getAllServices(pool);
    const fixedArray = mergeCategoriesIntoSingleProperty(allServices);
    return response.status(200).send(fixedArray);
  })
);

export default router;
