import React, { useState } from "react";
import  PlusIcon  from "../../../assets/icons/Plus.svg?react";
import Search from "../Search/Search";
import { Dropdown } from "../FilterComponents/Dropdown";
import { DatePick } from "../FilterComponents/DatePicker/DatePicker";
import PhoneSearch from "../Search/PhoneSearch";
import ExcelExportBtn from "../../ExcelExportBtn/ExcelExportBtn";
import  FilterIcon  from "../../../assets/icons/new-filter-icon.svg?react";
import  HalfCircleICon  from "../../../assets/icons/filter/half-circle-svgrepo-com.svg?react";

const ConsultationPageHead = ({
  openModal,
  search,
  filter,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
  phoneSearchValues,
  PHONE_SEACH_VALUE,
  count,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="consultation-header-filter-container">
      <div className="teacher-page-add-btn">
        <FilterIcon
          onClick={() => setOpenFilter(!openFilter)}
          style={{ cursor: "pointer" }}
        />
        <button className="add-detail" onClick={openModal}>
          <PlusIcon />
          Əlavə et
        </button>
      </div>

      {openFilter && (
        <div className="consultation-header-filter">
          <div className="consultation-top-filter">
            {search && (
              <>
                <Search
                  searchData={searchData}
                  dataSearchValues={dataSearchValues}
                  className="search-input-con desktop"
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                />
                <PhoneSearch
                  searchData={searchData}
                  dataSearchValues={phoneSearchValues}
                  className="search-input-con phone-input-con desktop"
                  DATA_SEARCH_VALUE={PHONE_SEACH_VALUE}
                />
              </>
            )}
            <Dropdown type="course" />
            <Dropdown type="status" />
            <Dropdown type="whereComing" />
          </div>
          <div className="consultation-bottom-filter">
            <div className="consultation-bottom-filter-container">
              <Dropdown type="whereForDate" />
              <DatePick deviceType="desktop" />
              <div className="circle-icon">
                <p className="filter-count">{count || 0}</p>
                <HalfCircleICon />
              </div>
              <ExcelExportBtn pageName="consultation" filter />
            </div>

            <div className="lesson-table-btn-container teacher ">
              <button className="add-detail" onClick={() => filter()}>
                Tətbiq et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationPageHead;
