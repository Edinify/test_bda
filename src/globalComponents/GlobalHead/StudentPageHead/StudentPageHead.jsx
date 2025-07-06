import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import  HalfCircleICon  from "../../../assets/icons/filter/half-circle-svgrepo-com.svg?react";
import ExcelExportBtn from "../../../globalComponents/ExcelExportBtn/ExcelExportBtn";
import StudentStatusDropdown from "../StudentStatusDropdown/StudentStatusDropdown";
import  PlusIcon  from "../../../assets/icons/Plus.svg?react";
import Search from "../Search/Search";

const StudentPageHead = ({
  openModal,
  search,
  filter,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
  count,
}) => {
  return (
    <div className="student-header-filter-container">
      <div className="teacher-page-add-btn">
        <button className="add-detail" onClick={openModal}>
          <PlusIcon />
          Əlavə et
        </button>
      </div>
      <div className="student-header-filter">
        {search && (
          <Search
            searchData={searchData}
            dataSearchValues={dataSearchValues}
            className="search-input-con desktop"
            DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
          />
        )}
        <CoursesDropdown deviceType="desktop" />
        <GroupsDropdown deviceType="desktop" />
        <StudentStatusDropdown deviceType="desktop" />

        <div className="lesson-table-btn-container teacher ">
          <button className="add-detail" onClick={() => filter()}>
            Tətbiq et
          </button>
        </div>
        <div className="circle-icon">
          <p className="filter-count">{count || 0}</p>
          <HalfCircleICon />
        </div>

        <ExcelExportBtn pageName="student" />
      </div>
    </div>
    // <div className="student-filter-header">
    //   <CoursesDropdown deviceType="desktop" />
    //   <GroupsDropdown deviceType="desktop" />
    //   <StudentStatusDropdown deviceType="desktop" />
    //   <div className="lesson-table-btn-container student ">
    //     <button className="add-detail" onClick={() => filter()}>
    //       Tətbiq et
    //     </button>
    //   </div>
    //   <div className="circle-icon">
    //     <p className="filter-count">{count || 0}</p>
    //     <HalfCircleICon />
    //   </div>
    //   <ExcelExportBtn pageName="student" />
    // </div>
  );
};

export default StudentPageHead;
