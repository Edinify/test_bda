import { useCustomHook } from "../../../GlobalFunctions/globalFunctions";
import ArrowIcon  from "../../../../assets/icons/arrow-down-dropdown.svg?react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONSULTATION_STATUS_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";

function WhereComingDropdown({ deviceType }) {
  const dispatch = useDispatch();
  const { whereComingList } = useCustomHook();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { whereComing } = useSelector((state) => state.consultationStatus);

  const handleClick = (item) => {
    dispatch({
      type: CONSULTATION_STATUS_FILTER_ACTION_TYPE.GET_WHERE_COMING,
      payload: item.key,
    });
  };

  useEffect(() => {
    const currentStatus =
      whereComingList.find((item) => item.key === whereComing)?.value || "";

    setSelectedStatus(currentStatus);

    setDropdownOpen(false);
  }, [whereComing]);
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
        <h2>{selectedStatus ? selectedStatus : "Bizi haradan eşidiblər"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          <li onClick={() => handleClick({ key: "" })}>Hamısı</li>
          {whereComingList.map((item, i) => (
            <li key={i} onClick={() => handleClick(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WhereComingDropdown;
