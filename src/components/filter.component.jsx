import CatIcon from "./../pages/services/type-icons/cat-icon";
import DogIcon from "./../pages/services/type-icons/dog-icon";
import BirdIcon from "./../pages/services/type-icons/bird-icon";
import OthersIcon from "./../pages/services/type-icons/other-icon";
import FilterButton from "./../pages/services/filter-button.component";
import { useState } from "react";
import PropTypes from "prop-types";

export const Filter = ({
  handleFilterClick,
  activeFilters,
  handleReset,
  filterText,
  handleSearch,
  searchQuery,
  searchPlaceholder,
}) => {
  //   const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);

  const filterButtons = [
    {
      id: 1,
      whatFor: "Katės",
      icon: <CatIcon className={"filter-icon"} />,
    },
    {
      id: 2,
      whatFor: "Šunys",
      icon: <DogIcon className={"filter-icon"} />,
    },
    {
      id: 3,
      whatFor: "Paukščiai",
      icon: <BirdIcon className={"filter-icon"} />,
    },
    {
      id: 4,
      whatFor: "Kiti",
      icon: <OthersIcon className={"filter-icon"} />,
    },
  ];

  return (
    <div className="filter">
      <div className="filter__wrapper">
        <p>{filterText}: </p>
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
        {activeFilters.size > 0 && (
          <button className="filter-reset" onClick={handleReset}>
            Išvalyti
          </button>
        )}
      </div>
      <div className="filter-search__wrapper">
        <label
          htmlFor="search"
          className={`filter-search__label ${
            searchQuery || isSearchOnFocus ? "filter-search__label-moved" : ""
          }`}
        >
          {searchPlaceholder}
        </label>
        <input
          id="search"
          className="filter-search__input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsSearchOnFocus(true)}
          onBlur={() => setIsSearchOnFocus(false)}
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  activeFilters: PropTypes.object,
  handleFilterClick: PropTypes.func,
  handleReset: PropTypes.func,
  filterText: PropTypes.string,
  handleSearch: PropTypes.func,
  searchQuery: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};
export default Filter;
