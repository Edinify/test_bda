import React from "react";
import { useState } from "react";
import  ArrowIcon from "../../../assets/icons/arrow-down-dropdown.svg?react";

const GroupStudentsDropdown = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status  ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>Bütün Tələbələr ({data?.students?.length})</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {data?.students?.map((student) => (
            <li key={student._id}>{student.fullName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupStudentsDropdown;
