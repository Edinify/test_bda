import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STUDENT_GROUP_STATUS_FILTER_ACTION_TYPE } from "../../../redux/actions-type";

function StudentStatusDropdown({ deviceType }) {
  const dispatch = useDispatch();
  const { studentStatus } = useCustomHook();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { status } = useSelector((state) => state.studentGroupStatus);

  const handleClick = (item) => {
    dispatch({
      type: STUDENT_GROUP_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_STATUS,
      payload: item.key,
    });
  };

  useEffect(() => {
    const currentStatus =
      studentStatus.find((item) => item.key === status)?.value || "";

    setSelectedStatus(currentStatus);

    setDropdownOpen(false);
  }, [status]);
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
          {studentStatus.map((item, i) => (
            <li key={i} onClick={() => handleClick(item)}>
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentStatusDropdown;
