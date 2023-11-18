import propTypes from "prop-types";
import "./orders.style.css";
import OrderComponent from "./order.component";
export const Orders = () => {
  const orders = [
    {
      products: [
        { title: "Product A", price: 10, quantity: 2 },
        { title: "Product B", price: 11, quantity: 4 },
        { title: "Product C", price: 5, quantity: 10 },
      ],
      totalPrice: 53,
      orderState: "Ruošiamas",
      orderDate: "2023-10-11",
      orderId: 12,
    },
  ];

  return (
    <main className="orders">
      <h1 className="page-heading">Mano užsakymai</h1>
      <div className="orders__inner">
        {orders.map((order, index) => (
          <OrderComponent
            key={index}
            products={order.products}
            orderDate={order.orderDate}
            orderId={order.orderId}
            orderState={order.orderState}
            orderTotal={order.totalPrice}
          />
        ))}
      </div>
    </main>
  );
};

Orders.propTypes = {};
export default Orders;
