import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";
import ArrowIcon  from "../../../../assets/icons/arrow-down-dropdown.svg?react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONSULTATION_STATUS_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";

function ConsultationStatusDropdown({ deviceType }) {
  const dispatch = useDispatch();
  const { constStatusList } = useCustomHook();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { consultationStatus } = useSelector(
    (state) => state.consultationStatus
  );

  const handleClick = (item) => {
    dispatch({
      type: CONSULTATION_STATUS_FILTER_ACTION_TYPE.GET_CONSULTATION_STATUS,
      payload: item.key,
    });
  };

  useEffect(() => {
    const currentStatus =
      constStatusList.find((item) => item.key === consultationStatus)?.value ||
      "";

    setSelectedStatus(currentStatus);

    setDropdownOpen(false);
  }, [consultationStatus]);
  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>{selectedStatus ? selectedStatus : "Status"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          <li onClick={() => handleClick({ key: "" })}>Hamısı</li>
          {constStatusList.map((item, i) => (
            <li key={i} onClick={() => handleClick(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConsultationStatusDropdown;
