import propTypes from "prop-types";
import { ChangeDateFormat, ExtractDate } from "./../../../utils/helper-fncs";
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
        <h3>Užsakymo numeris - {orderId}</h3>
        <p>Užsakymo data - {ExtractDate(ChangeDateFormat(orderDate))}</p>
      </div>
      <ul className="orders__order-main">
        {products?.map(({ title, price, quantity }, index) => (
          <li className="orders__order-main-product" key={index}>
            <div></div>
            <h3>{title}</h3>
            <h4>{quantity} vnt</h4>
            <h4>{price} €/vnt</h4>
          </li>
        ))}
      </ul>
      <div className="orders__order-bot">
        <p>Užsakymo būsena - {orderState}</p>
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
