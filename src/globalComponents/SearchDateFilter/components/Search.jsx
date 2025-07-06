import React from "react";
import SearchIcon  from "../../../assets/icons/search-normal-20.svg?react";
import { useLocation } from "react-router-dom";

const Search = ({
  searchData,
  changeSearchValue,
  searchValue,
  
}) => {
  const location = useLocation();

  return (
    <form onSubmit={(e) => searchData(e)} className="search-form">
      {location.pathname === "/feedback/teacher" ? (
        <div className="input-box">
          <div className="search-icon" onClick={searchData}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Axtar"
            value={searchValue ? searchValue : ""}
            onChange={(e) => changeSearchValue(e)}
          />
        </div>
      ) : (
        <div className="input-box">
          <div className="search-icon" onClick={searchData}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Axtar"
            value={searchValue ? searchValue : ""}
            onChange={(e) => changeSearchValue(e)}
          />
        </div>
      )}
    </form>
  );
};

export default Search;
