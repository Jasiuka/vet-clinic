import ServicesItem from "./services-item.component";

import CatIcon from "./type-icons/cat-icon";
import DogIcon from "./type-icons/dog-icon";
import BirdIcon from "./type-icons/bird-icon";
import OthersIcon from "./type-icons/other-icon";
import "./services.style.css";
import { useState } from "react";
import Filter from "../../components/filter.component";
import { useGetAllServicesQuery } from "../../services/api-slice";
export const ServicesPage = () => {
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetAllServicesQuery();

  const fetchedData = data?.map((object) => ({ ...object }));

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

  const serviceItemWithAddedIcons = fetchedData?.map((service) => {
    let newArray = [];
    service.categoryIcons = [];
    delete service.num;
    service.categories.forEach((category) => {
      if (category === 1) {
        newArray = [
          ...newArray,
          <CatIcon key={5} className={"service-for__icon"} />,
        ];
      }
      if (category === 2) {
        newArray = [
          ...newArray,
          <DogIcon key={6} className={"service-for__icon"} />,
        ];
      }
      if (category === 3) {
        newArray = [
          ...newArray,
          <BirdIcon key={7} className={"service-for__icon"} />,
        ];
      }
      if (category === 4) {
        newArray = [
          ...newArray,
          <OthersIcon key={8} className={"service-for__icon"} />,
        ];
      }
    });
    service.categoryIcons = newArray;
    return service;
  });

  const filteredServices = serviceItemWithAddedIcons?.filter((service) =>
    service.categories.some((category) =>
      activeFilters.size === 0
        ? true && service.title.toLowerCase().includes(searchQuery)
        : activeFilters.has(category) &&
          service.title.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <main>
      <h2 className="page-heading ">Mūsų klinikoje teikiamos paslaugos</h2>
      <div className="services">
        <Filter
          handleFilterClick={handleFilterClick}
          handleReset={handleReset}
          filterText={"Kam paslauga skirta"}
          activeFilters={activeFilters}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          searchPlaceholder={"Paslaugos paieška"}
        />
        <div className="services-items">
          {filteredServices?.map(
            ({ title, serviceDescription, price, categoryIcons }) => {
              return (
                <ServicesItem
                  key={title}
                  description={serviceDescription}
                  price={price}
                  name={title}
                  forType={categoryIcons}
                />
              );
            }
          )}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;

// Katės - 1, Šunys - 2, Paukščiai - 3, Kiti - 4
