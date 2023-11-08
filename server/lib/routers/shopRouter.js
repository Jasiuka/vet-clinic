import { tryCatch } from "../../utils/tryCatch.js";
import { getProducts } from "../../queries/shop/shop-queries.js";
import pool from "../../../server.js";
import express from "express";
let router = express.Router();

router.get(
  "/api/v1/shop/products",
  tryCatch(async (request, response) => {
    const allProducts = await getProducts(pool);
    return response.status(200).send(allProducts);
  })
);

export default router;
