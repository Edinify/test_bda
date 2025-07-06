import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";
import {
  SYLLABUS_ALL_ACTIONS_TYPE,
  STUDENT_STATUS_FILTER_ACTION_TYPE,
  SELECTED_GROUPS_ACTION_TYPE,
} from "../../../redux/actions-type";
import { getAllCoursesAction } from "../../../redux/actions/coursesActions";
import { getSyllabusPaginationAction } from "../../../redux/actions/syllabusActions";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";

export const CoursesDropdown = ({ deviceType = "", type }) => {
  const dispatch = useDispatch();
  const { allCourses: dataList } = useSelector((state) => state.allCourses);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { selectedCourses } = useSelector((state) => state.selectedGroups);

  const location = useLocation();

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.CLEAR_COURSE,
      });

      dispatch({
        type: STUDENT_STATUS_FILTER_ACTION_TYPE.CLEAR_STUDENT_COURSEID,
      });
    };
  }, [dispatch]);

  const getCourse = (course) => {
    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.SELECT_COURSE_FOR_SYLLABUS,
      payload: course,
    });

    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.RESET_SYLLABUS_PAGINATION,
    });

    dispatch(getSyllabusPaginationAction(0, "", course._id));
  };

  const handleAllCourse = () => {
    dispatch({
      type: STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_COURSEID,
      payload: "",
    });

    dispatch({
      type: SYLLABUS_ALL_ACTIONS_TYPE.CLEAR_COURSE,
    });

    dispatch({
      type: SELECTED_GROUPS_ACTION_TYPE.SELECTED_COURSES,
      payload: [],
    });
    setDropdownOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCoursesAction());
  }, [dispatch]);

  const handleChangeDrop = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectedGroup = (id) => {
    let updatedGroups;

    if (selectedCourses.includes(id)) {
      updatedGroups = selectedCourses.filter((groupId) => groupId !== id);
    } else {
      updatedGroups = [...selectedCourses, id];
    }
    dispatch({
      type: SELECTED_GROUPS_ACTION_TYPE.SELECTED_COURSES,
      payload: updatedGroups,
    });
  };

  const handleOneCourse = (id) => {
    dispatch({
      type: STUDENT_STATUS_FILTER_ACTION_TYPE.GET_STUDENT_COURSEID,
      payload: id,
    });
  };

  // const sortedDataList = [...dataList].sort((a, b) => {
  //   const isSelectedA = selectedCourses.includes(a._id);
  //   const isSelectedB = selectedCourses.includes(b._id);
  //   return isSelectedB - isSelectedA;
  // });

  console.log(selectedCourses, "selectedCoursessssssssssssssssssssssssss");
  console.log(selectedCourse, "selectedCourseeeeeeeeeeeeeeeeeeee");
  return (
    <div
      ref={dropdownRef}
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div className="dropdown-head" onClick={handleChangeDrop}>
        {!["/tuition-fee", "/tuitionFee"].includes(location.pathname) ? (
          <h2>{selectedCourse ? selectedCourse.name : "İxtisaslar"}</h2>
        ) : (
          <h2>İxtisaslar ({selectedCourses?.length}) </h2>
        )}

        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          <li onClick={handleAllCourse}>Hamısı</li>
          {dataList
            ?.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))
            .sort(
              (c, d) =>
                selectedCourses.includes(d._id) -
                selectedCourses.includes(c._id)
            )
            ?.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  handleSelectedGroup(item._id);
                  getCourse(item);
                  handleOneCourse(item._id);
                }}
              >
                {(location.pathname === "/tuition-fee" ||
                  location.pathname === "/tuitionFee") && (
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    checked={selectedCourses?.includes(item._id)}
                    onChange={() => handleSelectedGroup(item._id)}
                  />
                )}

                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
