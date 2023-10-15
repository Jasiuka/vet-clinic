import ProductCard from "./product-card.component";
import DATA from "./shop-data.json";
import "./shop.style.css";
export const ShopPage = () => {
  return (
    <main className="shop">
      <h2 className="page-heading for-observer">Elektroninė parduotuvė</h2>
      <div className="shop-inner">
        <div className="shop-inner--products">
          {DATA.products.map(({ id, title, price, image }, index) => {
            return (
              <ProductCard
                title={title}
                price={price}
                image={image}
                key={index}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
