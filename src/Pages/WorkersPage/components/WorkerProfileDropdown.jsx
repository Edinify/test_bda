import React from "react";
import {  useState } from "react";
import  ArrowIcon from "../../../assets/icons/arrow-down-dropdown.svg?react";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";

const WorkerProfileDropdown = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { generalProfileList, generalProfilePowerList } = useCustomHook();

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
        <h2>Bütün Profillər</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {data?.profiles?.map((item) => (
            <li key={item._id}>
              {
                generalProfileList.find(
                  (profile) => profile.key === item.profile
                ).name
              }{" "}
              -{" "}
              {
                generalProfilePowerList.find(
                  (profile) => profile.key === item.power
                ).name
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkerProfileDropdown;
