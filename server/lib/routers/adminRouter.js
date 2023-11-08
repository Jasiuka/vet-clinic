import {
  getAppointments,
  getEmployees,
  getAllProducts,
} from "../../queries/admin/admin-queries.js";
import { categoryById } from "../../utils/helper.js";
import { tryCatch } from "../../utils/tryCatch.js";
import express from "express";
import pool from "./../../../server.js";
import { checkUserRole } from "../../utils/helper.js";

let router = express.Router();

router.get(
  "/api/v1/admin/appointments",
  tryCatch(async (request, response) => {
    const allAppointments = await getAppointments(pool);

    return response.status(200).send(allAppointments);
  })
);

router.get(
  "/api/v1/admin/employees",
  tryCatch(async (request, response) => {
    const allEmployees = await getEmployees(pool);
    return response.status(200).send(allEmployees);
  })
);

router.get(
  "/api/v1/admin/products",
  tryCatch(async (request, response) => {
    const allProducts = await getAllProducts(pool);
    const addCategoryName = (allProductsData) => {
      const newArray = allProductsData.map((product) => {
        return {
          ...product,
          Kategorija: categoryById(product.Kategorija),
        };
      });
      return newArray;
    };
    const newAllProducts = addCategoryName(allProducts);
    return response.status(200).send(newAllProducts);
  })
);

router.get(
  "/valdymas",
  checkUserRole([1]),
  tryCatch(async (req, res) => {
    return res.status(200);
  })
);

router.all("/api/v1/admin/", checkUserRole([1]));

export default router;
