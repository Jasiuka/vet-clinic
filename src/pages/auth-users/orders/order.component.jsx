import propTypes from "prop-types";
export const OrderComponent = ({
  products,
  orderId,
  orderDate,
  orderState,
  orderTotal,
}) => {
  return (
    <div className="orders__order">
      <div className="orders__order-top">
        <h3>Užsakymo numeris: {orderId}</h3>
        <p>Užsakymo data: {orderDate}</p>
      </div>
      <ul className="orders__order-main">
        {products.map(({ title, price, quantity }, index) => (
          <li className="orders__order-main-product" key={index}>
            <p>{title}</p>
            <p>{quantity} vnt</p>
            <p>{price} €/vnt</p>
          </li>
        ))}
      </ul>
      <div className="orders__order-bot">
        <p>Užsakymo būsena: {orderState}</p>
        <p>Iš viso suma: {orderTotal}€</p>
      </div>
    </div>
  );
};
OrderComponent.propTypes = {
  products: propTypes.array,
  orderId: propTypes.number,
  orderDate: propTypes.string,
  orderState: propTypes.string,
  orderTotal: propTypes.number,
};
export default OrderComponent;
