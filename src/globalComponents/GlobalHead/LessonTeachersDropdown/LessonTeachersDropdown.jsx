import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";
import CheckIcon  from "../../../assets/icons/Checkbox.svg?react";
import { DROPDOWN_TEACHER_ACTIONS_TYPE } from "../../../redux/actions-type";

const LessonTeachersDropdown = ({ deviceType = "" }) => {
  const dispatch = useDispatch();
  const { selectedTeacher } = useSelector((state) => state.dropdownTeacher);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { selectedGroup } = useSelector((state) => state.dropdownGroup);

  const getTeacher = (teacher) => {
    setDropdownOpen(false);
    dispatch({
      type: DROPDOWN_TEACHER_ACTIONS_TYPE.SELECT_TEACHER,
      payload: teacher,
    });
  };

  const handleSelectAll = () => {
    setDropdownOpen(false);
    dispatch({
      type: DROPDOWN_TEACHER_ACTIONS_TYPE.SELECT_TEACHER,
      payload: "",
    });
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
        <h2>{selectedTeacher ? selectedTeacher.fullName : "Təlimçilər"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>
      <div className="dropdown-body">
        <ul>
          <li onClick={handleSelectAll}>Hamısı</li>
          {selectedGroup?.teachers?.map((item) => (
            <li key={item._id} onClick={() => getTeacher(item)}>
              {selectedTeacher === item._id && <CheckIcon />}
              {item.fullName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonTeachersDropdown;
