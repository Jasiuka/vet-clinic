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

let server = express.Router();

server.get(
  "/api/v1/admin/appointments",
  checkUserRole([1]),
  tryCatch(async (request, response) => {
    const allAppointments = await getAppointments(pool);

    return response.status(200).send(allAppointments);
  })
);

server.get(
  "/api/v1/admin/employees",
  checkUserRole([1]),
  tryCatch(async (request, response) => {
    const allEmployees = await getEmployees(pool);
    return response.status(200).send(allEmployees);
  })
);

server.get(
  "/api/v1/admin/products",
  checkUserRole([1]),
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

export default server;
