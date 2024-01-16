import "./orders.style.css";
import OrderComponent from "./order.component";
import { useGetUserOrdersQuery } from "../../../services/api-slice";
export const Orders = () => {
  const { data: userOrders, error, isLoading } = useGetUserOrdersQuery();
  return (
    <main className="orders">
      <h1 className="page-heading">Mano užsakymai</h1>

      <div className="orders__inner">
        {userOrders ? (
          userOrders?.map((order, index) => (
            <OrderComponent
              key={index}
              products={order.products}
              orderDate={order.date}
              orderId={order.id}
              orderState={order.state}
              orderTotal={order.total}
            />
          ))
        ) : (
          <h1>Kol kas nieko neužsisakėte</h1>
        )}
      </div>
    </main>
  );
};

export default Orders;
