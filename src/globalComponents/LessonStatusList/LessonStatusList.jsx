import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LESSON_STATUS_ACTION_TYPE,
  STUDENT_ATTENDACE_ACTION_TYPE,
} from "../../redux/actions-type";
import  ArrowIcon  from "../../assets/icons/arrow-down-dropdown.svg?react";
import  CheckIcon  from "../../assets/icons/Checkbox.svg?react"


export const LessonStatusList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { lessonStatus } = useSelector(
    (state) => state.lessonStatus
  );
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lessonStatusList = [
    { key: "all", name: "Bütün statuslar" },
    { key: "confirmed", name: "Təsdiqləndi" },
    { key: "cancelled", name: "Ləğv edildi" },
  ];
  const attendanceList = [
    { key: "all", name: "Bütün statuslar" },
    { key: "present", name: "İştirak etdi" },
    { key: "absent", name: "Iştirak etmədi" },
  ];

  return (
    <div className={`global-category-dropdown dropdown-name lesson-status ${dropdownOpen ? "active" : ""}`}>
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>
        {location.pathname.substring(0, 8) === "/student" ? (studentAttendance ?
        attendanceList.find((item) => item.key === studentAttendance).name : 'Bütün statuslar') : (
          lessonStatus ? lessonStatusList.find((item) => item.key === lessonStatus).name : 'Bütün statuslar'
        ) }
        </h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        {location.pathname.substring(0, 8) === "/student" ? (
          <ul>
            {attendanceList.map((item) => (
              <li
                key={item.key}
                id={item.key}
                onClick={() => {
                  setDropdownOpen(false);
                  dispatch({
                    type: STUDENT_ATTENDACE_ACTION_TYPE.GET_STUDENT_ATTENDANCE_TYPE,
                    payload: item.key,
                  });
                }}
              >
                {studentAttendance === item.key && <CheckIcon />}
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {lessonStatusList.map((item) => (
              <li
                key={item.key}
                id={item.key}
                className={lessonStatus === item.key ? "active" : ""}
                onClick={() => {
                  dispatch({
                    type: LESSON_STATUS_ACTION_TYPE.UPDATE_LESSON_STATUS,
                    payload: item.key,
                  });
                  setDropdownOpen(false);
                }}
              >
                {lessonStatus === item.key && <CheckIcon />}
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
