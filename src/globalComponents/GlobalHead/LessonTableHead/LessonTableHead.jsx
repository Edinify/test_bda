import React from "react";
import LessonStatusResult from "../LessonStatusResult/LessonStatusResult";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { StatusDropdown } from "../StatusDropdown/StatusDropdown";
import { DatePick } from "../../DatePicker/DatePicker";
import PlusIcon  from "../../../assets/icons/Plus.svg?react";
import LessonTeachersDropdown from "../LessonTeachersDropdown/LessonTeachersDropdown";
import HalfCircleICon  from "../../../assets/icons/filter/half-circle-svgrepo-com.svg?react";

const LessonTableHead = ({ showAddBtn, filter, openModal, count }) => {
  return (
    <div className="lesson-page-header-container">
      <div className="lesson-page-header-top">
        <div className="lesson-status-header">
          <LessonStatusResult />
        </div>
        {showAddBtn && (
          <div className="lesson-page-add-btn">
            <button className="add-detail" onClick={openModal}>
              <PlusIcon />
              Əlavə et
            </button>
          </div>
        )}
      </div>
      <div className="lesson-table-page-header-container">
        <div className="lesson-page-filter-container">
          <div className="lesson-table-header-content">
            <div className="lesson-table-status">
              <GroupsDropdown deviceType="desktop" page="lesson-table" />
              <StatusDropdown statusType="lesson-table" deviceType="desktop" />
              <LessonTeachersDropdown />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div className="lesson-table-datepick">
                <DatePick deviceType="desktop" />
              </div>
              <div className="lesson-table-right-container">
                <div className="lesson-page-apply-btn">
                  <div className="lesson-table-btn-container lesson-page ">
                    <button className="add-detail" onClick={() => filter()}>
                      Tətbiq et
                    </button>
                  </div>
                </div>
                <div className="circle-icon">
                  <p className="filter-count">{count || 0}</p>
                  <HalfCircleICon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonTableHead;
