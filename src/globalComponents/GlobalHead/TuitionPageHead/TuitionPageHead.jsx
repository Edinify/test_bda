import React, { useState } from "react";
import Search from "../Search/Search";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import ExcelExportBtn from "../../ExcelExportBtn/ExcelExportBtn";
import { Dropdown } from "../FilterComponents/Dropdown";
import FilterIcon  from "../../../assets/icons/new-filter-icon.svg?react";

const TuitionPageHead = ({
  search,
  filter,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="tuition-fee-container">
      <FilterIcon
        onClick={() => setOpenFilter(!openFilter)}
        style={{ cursor: "pointer" }}
      />
      {openFilter && (
        <div>
          <div className="tuition-fee-payment-container">
          </div>
          <div className="tution-fee-filter-header">
            {search && (
              <Search
                searchData={searchData}
                dataSearchValues={dataSearchValues}
                className="search-input-con desktop"
                DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
              />
            )}
            <CoursesDropdown deviceType="desktop" type="tuition" />
            <GroupsDropdown deviceType="desktop" type="tuition" />
            <Dropdown type="tuitionStatus" />
            <div className="lesson-table-btn-container tution ">
              <button className="add-detail" onClick={() => filter()}>
                Tətbiq et
              </button>
            </div>
            <ExcelExportBtn pageName={"tuition-fee"} />
          </div>
   
        </div>
      )}
    </div>
  );
};

export default TuitionPageHead;
