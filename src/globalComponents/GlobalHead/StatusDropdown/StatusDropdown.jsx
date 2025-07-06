import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowIcon from "../../../assets/icons/arrow-down-dropdown.svg?react";
import CheckIcon  from "../../../assets/icons/Checkbox.svg?react";
import {
  STUDENT_STATUS_FILTER_ACTION_TYPE,
  TEACHER_STATUS_FILTER_ACTION_TYPE,
  LESSON_TABLE_ALL_ACTIONS_TYPE,
} from "../../../redux/actions-type";

export const StatusDropdown = ({ statusType, deviceType = "" }) => {
  const { teacherStatus } = useSelector((state) => state.teacherStatus);
  const { studentStatus } = useSelector((state) => state.studentStatus);

  const dispatch = useDispatch();
  // const StatusFilter = [
  //   { key: "all", name: "Bütün statuslar" },
  //   { key: "active", name: "Aktiv" },
  //   { key: "deactive", name: "Deaktiv" },
  // ];
  // const lessonTableFilter=[
  //   { key: "all", name: "Bütün statuslar" },
  //   {key:"confirmed",name:"Keçirilib"},
  //   {key:"unviewed",name:"Gözləyir"},
  //   {key:"cancelled",name:"Ləğv edilib"}
  // ]
  const filterData = {
    teacher: [
      { key: "all", name: "Bütün statuslar" },
      { key: "active", name: "Aktiv" },
      { key: "deactive", name: "Deaktiv" },
    ],
    "lesson-table": [
      { key: "all", name: "Bütün statuslar" },
      { key: "confirmed", name: "Keçirilib" },
      { key: "unviewed", name: "Gözləyir" },
      { key: "cancelled", name: "Əvəzlənəcək" },
    ],
  };

  const filterItems = filterData[statusType] || [];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const getCategory = (categoryType) => {
    setSelectedType(categoryType.name);
    setDropdownOpen(false);
    if (statusType === "teacher") {
      dispatch({
        type: TEACHER_STATUS_FILTER_ACTION_TYPE.GET_TEACHER_STATUS,
        payload: categoryType.key,
      });
    } else {
      dispatch({
        type: STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_STATUS,
        payload: categoryType.key,
      });
    }
  };

  useEffect(() => {
    setSelectedType("");
  }, []);

  const handleClick = (item) => {
    dispatch({
      type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_STATUS,
      payload: item.key,
    });
    getCategory(item);
  };

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
        <h2>{selectedType ? selectedType : "Bütün Statuslar"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {filterItems.map((item) => (
            <li key={item.key} onClick={() => handleClick(item)}>
              {teacherStatus === item.id && <CheckIcon />}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
