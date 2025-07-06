import React, { useEffect } from "react";
import  ActiveStudentsIcon  from "../../../../assets/icons/report/activeStudent.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { getContinuesStudentsCountForEachCourse } from "../../../../redux/actions/reportActions";
import Tooltip from "@mui/material/Tooltip";

const ActiveStudentsCard = () => {
  const dispatch = useDispatch();

  const { continuesStudentsCountForCourse: activeStudents } = useSelector(
    (state) => state.reportDatas
  );

  const activeStudentsCount = activeStudents?.reduce(
    (acc, curr) => acc + curr.studentsCount,
    0
  );

  useEffect(() => {
    dispatch(getContinuesStudentsCountForEachCourse());
  }, [dispatch]);

  return (
    <div className="active-students-card ">
      <h2>Aktiv Tələbə</h2>
      <div className="student-count">
        <h4>{activeStudentsCount ? activeStudentsCount : 0}</h4>
        <div className="active-student-img-container">
          <ActiveStudentsIcon />
        </div>
      </div>
      <div className="student-count-for-lessons">
        {activeStudents?.map((course) => (
          <div key={course.courseId} className="student-for-lesson">
            <Tooltip
              title={course.courseName}
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "16px",
                    padding: "10px",
                  },
                },
              }}
            >
              <h4
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100px",
                }}
              >
                {course.courseName}
              </h4>
            </Tooltip>
            <span>{course.studentsCount} Tələbə </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveStudentsCard;
