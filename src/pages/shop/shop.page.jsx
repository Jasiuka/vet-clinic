import ProductCard from "./product-card.component";
import { useGetAllProductsQuery } from "./../../services/api-slice";
import Filter from "../../components/filter.component";
import { useState } from "react";
import "./shop.style.css";
export const ShopPage = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (index) => {
    if (activeFilters.has(index)) {
      const newSet = new Set(activeFilters);
      newSet.delete(index);
      setActiveFilters(newSet);
    } else {
      const newSet = new Set(activeFilters);
      newSet.add(index);
      setActiveFilters(newSet);
    }
  };
  const handleReset = () => {
    const newSet = new Set();
    setActiveFilters(newSet);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = data?.filter((product) =>
    activeFilters.size === 0
      ? true && product.title.toLowerCase().includes(searchQuery)
      : activeFilters.has(product.category) &&
        product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <main className="shop">
      <h2 className="page-heading for-observer">Elektroninė parduotuvė</h2>
      <div className="shop-inner">
        <Filter
          handleFilterClick={handleFilterClick}
          handleReset={handleReset}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          filterText={"Prekės kategorija"}
          activeFilters={activeFilters}
        />
        <div className="shop-inner--products">
          {filteredProducts?.map(
            ({ id, title, price, mName, imagePath }, index) => {
              return (
                <ProductCard
                  title={title}
                  price={price}
                  image={imagePath}
                  key={index}
                  id={id}
                />
              );
            }
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
