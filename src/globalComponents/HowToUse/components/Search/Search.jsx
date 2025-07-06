import React from "react";
import "./search.css";
import SearchIcon from "../../../../assets/icons/search-normal-20.svg?react";

const Search = () => {
  return (
    <div className="input-box">
      <div className="search-icon">
        <SearchIcon />
      </div>
      <input type="text" placeholder="Axtar" />
    </div>
  );
};

export default Search;
