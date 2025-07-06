import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { PAGINATION_PAGE_NUMBER_ACTION_TYPE} from "../../../redux/actions-type";
import { getMainpageTableLessonsAction } from "../../../redux/actions/mainpageTableLessonsAction";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";

const TablePagination = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { startWeek, endWeek } = useCustomHook();
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const { lessonStatus } = useSelector((state) => state.lessonStatus);
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { tableType } = useSelector((state) => state.tableType);
  const { pageNumber } = useSelector((state) => state.pageNumber);
  const { weeksBetweenSelectedDates } = useSelector((state) => state.weeksBetweenSelectedDates);


  const changePageNum = (selectedPageNumber) => {
    dispatch({
      type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
      payload: selectedPageNumber,
    });
  };
  const getTeacherPanelLessons = (selectedPageNumber) => {
    dispatch(
      getMainpageTableLessonsAction({
        startDate:
          weeksBetweenSelectedDates.length > 0
            ? weeksBetweenSelectedDates[selectedPageNumber - 1].startWeek
            : startWeek,
        endDate:
          weeksBetweenSelectedDates.length > 0
            ? weeksBetweenSelectedDates[selectedPageNumber - 1].endWeek
            : endWeek,
        status: lessonStatus === "all" ? "" : lessonStatus,
      })
    );
  };
  const getStudentPanelLessons = (selectedPageNumber) => {
    dispatch(
      getMainpageTableLessonsAction({
        startDate:
          weeksBetweenSelectedDates.length > 0
            ? weeksBetweenSelectedDates[selectedPageNumber - 1].startWeek
            : startWeek,
        endDate:
          weeksBetweenSelectedDates.length > 0
            ? weeksBetweenSelectedDates[selectedPageNumber - 1].endWeek
            : endWeek,
        attendance: studentAttendance === "all" ? "" : studentAttendance,
      })
    );
  };
  const getAdminPanelLessons = (selectedPageNumber) => {
    if (tableType === "main page") {
      if (mainpageType === "teacher") {
        dispatch(
          getMainpageTableLessonsAction({
            teacherId: dropdownName._id,
            startDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[selectedPageNumber - 1].startWeek
                : startWeek,
            endDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[selectedPageNumber - 1].endWeek
                : endWeek,
            status: lessonStatus === "all" ? "" : lessonStatus,
          })
        );
      } else if (mainpageType === "student") {
        dispatch(
          getMainpageTableLessonsAction({
            studentId: dropdownName._id,
            startDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[selectedPageNumber - 1].startWeek
                : startWeek,
            endDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[selectedPageNumber - 1].endWeek
                : endWeek,
            attendance: studentAttendance === "all" ? "" : studentAttendance,
          })
        );
      }
    } else if (tableType === "temporary page") {
      /* temporary table */
      if (mainpageType === "teacher") {
        dispatch(
          getMainpageTableLessonsAction({
            teacherId: dropdownName._id,
            startDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[selectedPageNumber - 1].startWeek
                : startWeek,
            endDate:
              weeksBetweenSelectedDates.length > 0
                ? weeksBetweenSelectedDates[selectedPageNumber - 1].endWeek
                : endWeek,
            status: lessonStatus === "all" ? "" : lessonStatus,
          })
        );
      }
    }
  };

  const getPageNumber = (selectedPageNumber) => {
    changePageNum(selectedPageNumber);
    if (dropdownName) {
      getAdminPanelLessons(selectedPageNumber);
    } else if (userData.role === "teacher") {
      getTeacherPanelLessons(selectedPageNumber);
    } else if (userData.role === "student") {
      getStudentPanelLessons(selectedPageNumber);
    }
  };


  return (
    <div className="cur-pagination">
      {pageNumber > 0 && (
        <Pagination
          defaultCurrent={1}
          total={weeksBetweenSelectedDates.length * 10}
          onChange={getPageNumber}
        />
      )}
    </div>
  );
};

export default TablePagination;
