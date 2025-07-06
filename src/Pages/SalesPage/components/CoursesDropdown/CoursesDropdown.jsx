import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  ArrowIcon  from "../../../../assets/icons/arrow-down-dropdown.svg?react";
import  CheckIcon  from "../../../../assets/icons/Checkbox.svg?react";
import {
  SALES_ACTIONS_TYPE,
  SYLLABUS_ALL_ACTIONS_TYPE,
} from "../../../../redux/actions-type";
import { getAllCoursesAction } from "../../../../redux/actions/coursesActions";
import { getSyllabusPaginationAction } from "../../../../redux/actions/syllabusActions";

export const CoursesDropdown = ({ deviceType = "" }) => {
  const dispatch = useDispatch();
  const { allCourses: dataList } = useSelector((state) => state.allCourses);
  const { courseId } = useSelector((state) => state.salesData);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCourse = (course) => {
    setDropdownOpen(false);
    dispatch({
      type: SALES_ACTIONS_TYPE.UPDATE_COURSE_ID,
      payload: course._id,
    });
  };

  useEffect(() => {
    dispatch(getAllCoursesAction());
  }, []);

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
      style={{ width: "200px", marginLeft: "12px" }}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#f4f4f4",
          borderRadius: "4px",
        }}
      >
        <h2>
          {dataList.find((item) => item._id === courseId)?.name || "İxtisaslar"}
        </h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          <li onClick={() => getCourse({ _id: "" })}>Hamısı</li>
          {dataList.map((item) => (
            <li key={item._id} onClick={() => getCourse(item)}>
              {courseId === item._id && <CheckIcon />}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
