import SERVICES_DATA from "../../data/services-data.json";
import ServicesItem from "./services-item.component";
import FilterButton from "./filter-button.component";
import CatIcon from "./type-icons/cat-icon";
import DogIcon from "./type-icons/dog-icon";
import BirdIcon from "./type-icons/bird-icon";
import OthersIcon from "./type-icons/other-icon";
import { useState } from "react";
export const ServicesPage = () => {
  const [activeFilters, setActiveFilters] = useState(new Set());

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

  const filterButtons = [
    {
      id: 1,
      whatFor: "Katės",
      icon: <CatIcon />,
    },
    {
      id: 2,
      whatFor: "Šunys",
      icon: <DogIcon />,
    },
    {
      id: 3,
      whatFor: "Paukščiai",
      icon: <BirdIcon />,
    },
    {
      id: 4,
      whatFor: "Kiti",
      icon: <OthersIcon />,
    },
    {
      id: 5,
      whatFor: "Visi",
      icon: [<CatIcon />, <DogIcon />, <BirdIcon />, <OthersIcon />],
    },
  ];

  const filteredServices = SERVICES_DATA.services.filter((service) =>
    service.type.some((type) =>
      activeFilters.size === 0 ? true : activeFilters.has(type)
    )
  );

  return (
    <main>
      <h2 className="page-heading">Mūsų klinikoje teikiamos paslaugos</h2>
      <div className="services">
        <div className="filter">
          <p>Filtras</p>
          <div className="filter__wrapper">
            {filterButtons.map(({ id, whatFor, icon }) => {
              return (
                <FilterButton
                  key={whatFor}
                  icon={icon}
                  whatFor={whatFor}
                  index={id}
                  handleClick={handleFilterClick}
                  isActive={activeFilters.has(id)}
                />
              );
            })}
          </div>
          {activeFilters.size > 0 && (
            <button className="filter-reset" onClick={handleReset}>
              Išvalyti
            </button>
          )}
        </div>
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

// Katės - 1, Šunys - 2, Paukščiai - 3, Kiti - 4, Visi - 5
