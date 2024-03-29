import { tryCatch } from "../../utils/tryCatch.js";
import {
  getProducts,
  createOrderedProductDetail,
  createNewOrder,
} from "../../queries/shop/shop-queries.js";
import { orderFormValidation } from "../../utils/helper.js";
import pool from "../../../server.js";
import express from "express";
import { getUserIdByEmail } from "../../queries/user/user-queries.js";
import {
  sendEmail,
  mailOptions,
  generateProductsHtml,
  generateHtmlTemplate,
} from "../../utils/mailer.js";
let router = express.Router();

router.get(
  "/api/v1/shop/products",
  tryCatch(async (request, response) => {
    const allProducts = await getProducts(pool);
    return response.status(200).send(allProducts);
  })
);

router.post(
  "/api/v1/shop/order",
  orderFormValidation(),
  tryCatch(async (request, response) => {
    const {
      products,
      state,
      email,
      fullName,
      phone,
      payment,
      price,
      shippingPrice,
    } = request.body;

    const userId = await getUserIdByEmail(pool, request.body.email);
    const today = new Date();
    const formatedToday = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const newOrderId = await createNewOrder(
      pool,
      email,
      userId?.id,
      phone,
      state,
      price,
      fullName,
      formatedToday
    );

    if (!newOrderId)
      return response.status(400).send({
        message: "Įvyko klaida. Bandykite dar kartą.",
        type: "error",
      });

    products.forEach(
      async (product) =>
        await createOrderedProductDetail(
          pool,
          newOrderId.id,
          product.id,
          product.quantity
        )
    );

    sendEmail(
      mailOptions(
        email,
        "Užsakymo sąskaita faktūra",
        "Sveiki, siunčiame jums jūsų užsakymo sąskaitą faktūrą",
        generateHtmlTemplate(
          newOrderId.id,
          products,
          generateProductsHtml,
          price,
          payment,
          shippingPrice,
          fullName
        )
      )
    );

    return response.status(200).send({
      message: "Užsakymas gautas",
    });
  })
);

export default router;
