import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchIcon  from "../../../assets/icons/search-normal-new.svg?react";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../redux/actions-type";
import { useLocation } from "react-router-dom";

const Search = ({
  searchData,
  dataSearchValues,
  className,
  DATA_SEARCH_VALUE,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    return () =>
      dispatch({ type: SEARCH_VALUES_ACTION_TYPES.RESET_SEARCH_VALUES });
  }, []);
  return (
    <form onSubmit={(e) => searchData(e)} className={className}>
      <div className="input-box">
        <div className="search-icon" onClick={searchData}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Ada görə axtar"
          onChange={(e) =>
            dispatch({
              type: SEARCH_VALUES_ACTION_TYPES[DATA_SEARCH_VALUE],
              payload: e.target.value,
            })
          }
          value={dataSearchValues ? dataSearchValues : ""}
        />
      </div>
    </form>
  );
};

export default Search;
