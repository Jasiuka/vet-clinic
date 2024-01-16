import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import express from "express";
import { getUserOrdersByAccountId } from "../../queries/user/user-queries.js";

let router = express.Router();

const mergeUserOrderProducts = (userOrders) => {
  if (!userOrders) {
    return null;
  }
  const orders = [];
  for (let i = 0; i < userOrders.length; i++) {
    const addedOrder = orders.find((order) => order.id === userOrders[i].id);

    if (!addedOrder) {
      const newOrder = {
        id: userOrders[i].id,
        total: userOrders[i].totalPrice,
        date: userOrders[i].orderDate,
        state: userOrders[i].orderState,
        products: [
          {
            title: userOrders[i].title,
            quantity: userOrders[i].quantity,
            price: userOrders[i].price,
          },
        ],
      };
      orders.push(newOrder);
    }

    if (addedOrder) {
      addedOrder.products = [
        ...addedOrder.products,
        {
          title: userOrders[i].title,
          quantity: userOrders[i].quantity,
          price: userOrders[i].price,
        },
      ];
    }
  }

  return orders;
};

router.get(
  "/api/v1/orders",
  tryCatch(async (request, response) => {
    const accountId = request.session?.userId;
    if (!accountId)
      return response.status(401).send({
        message: "Neturite teisių pasiekti šį turinį.",
      });
    const userOrders = await getUserOrdersByAccountId(pool, accountId);
    const orders = mergeUserOrderProducts(userOrders);
    return response.status(200).send(orders);
  })
);

export default router;
