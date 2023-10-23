import SERVICES_DATA from "../../data/services-data.json";
import ServicesItem from "./services-item.component";

import CatIcon from "./type-icons/cat-icon";
import DogIcon from "./type-icons/dog-icon";
import BirdIcon from "./type-icons/bird-icon";
import OthersIcon from "./type-icons/other-icon";
import "./services.style.css";
import { useState } from "react";
import Filter from "../../components/filter.component";
export const ServicesPage = () => {
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

  const serviceItemWithAddedIcons = SERVICES_DATA.services.map((service) => {
    let newArray = [];
    service.type.forEach((type) => {
      if (type === 1) {
        newArray = [
          ...newArray,
          <CatIcon key={5} className={"service-for__icon"} />,
        ];
      }
      if (type === 2) {
        newArray = [
          ...newArray,
          <DogIcon key={6} className={"service-for__icon"} />,
        ];
      }
      if (type === 3) {
        newArray = [
          ...newArray,
          <BirdIcon key={7} className={"service-for__icon"} />,
        ];
      }
      if (type === 4) {
        newArray = [
          ...newArray,
          <OthersIcon key={8} className={"service-for__icon"} />,
        ];
      }
    });
    service.forType = newArray;
    return service;
  });

  const filteredServices = serviceItemWithAddedIcons.filter((service) =>
    service.type.some((type) =>
      activeFilters.size === 0
        ? true && service.name.toLowerCase().includes(searchQuery)
        : activeFilters.has(type) &&
          service.name.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <main>
      <h2 className="page-heading for-observer">
        Mūsų klinikoje teikiamos paslaugos
      </h2>
      <div className="services">
        <Filter
          handleFilterClick={handleFilterClick}
          handleReset={handleReset}
          filterText={"Kam paslauga skirta"}
          activeFilters={activeFilters}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <div className="services-items">
          {filteredServices.map(({ name, description, price, forType }) => {
            return (
              <ServicesItem
                key={name}
                description={description}
                price={price}
                name={name}
                forType={forType}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;

// Katės - 1, Šunys - 2, Paukščiai - 3, Kiti - 4
