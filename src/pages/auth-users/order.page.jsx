import "./orders.style.css";
export const Orders = () => {
  const orders = [];
  return (
    <main className="orders">
      <h1 className="page-heading">Mano užsakymai</h1>
      <div className="orders__inner">
        {orders.length > 0 ? (
          <div>Orders</div>
        ) : (
          <h2>Jūs dar nieko neužsisakėte</h2>
        )}
      </div>
    </main>
  );
};

export default Orders;
