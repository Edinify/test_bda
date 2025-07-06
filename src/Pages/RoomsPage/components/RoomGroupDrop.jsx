import React, { useState } from "react";
import  ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";

const RoomGroupDropdown = ({ data, day }) => {
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
        <h2>Qruplar</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body room">
        <ul>
          {data?.map((group, i) => {
            const lessonTimeObj = group?.lessonDate?.find(
              (item) => item.day == day
            );

            return (
              <li key={`${day}${i}`}>
                {group?.name} -
                <div>
                  <span>
                    {lessonTimeObj.startTime} - {lessonTimeObj.endTime}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RoomGroupDropdown;
