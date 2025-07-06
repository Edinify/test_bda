import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersPaginationAction } from "../../redux/actions/teachersActions";
import {
  TEACHERS_MODAL_ACTION_TYPE,
  TEACHER_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import TeachersData from "./components/TeachersData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import { useLocation } from "react-router-dom";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalLength, teachers, loading } = useSelector(
    (state) => state.teachersPagination
  );
  const { teachersSearchValues } = useSelector((state) => state.searchValues);
  const { teacherStatus } = useSelector((state) => state.teacherStatus);
  const { courseId } = useSelector((state) => state.studentStatus);
  const [role, setRole] = useState("teacher");

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const filterTeachers = () => {
    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.RESET_TEACHER_PAGINATION,
    });

    dispatch(
      getTeachersPaginationAction(
        0,
        teachersSearchValues,
        teacherStatus
          ? teacherStatus !== "all"
            ? teacherStatus
            : "all"
          : "all",
        role,
        courseId
      )
    );
  };
  // ============

  const getNextTeachers = () => {
    if (loading) return;

    if (teachersSearchValues) {
      dispatch(
        getTeachersPaginationAction(
          teachers?.length || 0,
          teachersSearchValues,
          teacherStatus
            ? teacherStatus !== "all"
              ? teacherStatus
              : "all"
            : "all",
          role,
          courseId
        )
      );
    } else {
      dispatch(
        getTeachersPaginationAction(
          teachers?.length || 0,
          "",
          teacherStatus
            ? teacherStatus !== "all"
              ? teacherStatus
              : "all"
            : "all",
          role,
          courseId
        )
      );
    }
  };

  // ========
  const openModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const searchData = (e) => {
    e.preventDefault();

    dispatch({
      type: TEACHER_ALL_ACTIONS_TYPE.RESET_TEACHER_PAGINATION,
    });

    dispatch(
      getTeachersPaginationAction(
        0,
        teachersSearchValues,
        teacherStatus
          ? teacherStatus !== "all"
            ? teacherStatus
            : "all"
          : "all",
        role
      )
    );
  };

  useEffect(() => {
    if (location.pathname === "/teachers") {
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.RESET_TEACHER_PAGINATION,
      });

      dispatch(
        getTeachersPaginationAction(
          0,
          teachersSearchValues || "",
          "all",
          "teacher"
        )
      );
      setRole("teacher");
    } else if (location.pathname === "/teachers/mentors") {
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.RESET_TEACHER_PAGINATION,
      });

      dispatch(
        getTeachersPaginationAction(
          0,
          teachersSearchValues || "",
          "all",
          "mentor"
        )
      );
      setRole("mentor");
    }

    return () => {
      dispatch({
        type: TEACHER_ALL_ACTIONS_TYPE.RESET_TEACHER_PAGINATION,
      });
    };
  }, [location]);

  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        filter={filterTeachers}
        DATA_SEARCH_VALUE={"TEACHERS_SEARCH_VALUE"}
        dataSearchValues={teachersSearchValues}
        statusType="teacher"
        profile={"teachers"}
        count={totalLength}
      />

      <HeadTabs
        firstRoute={"/teachers"}
        secondRoute={"/teachers/mentors"}
        firstPathname={"Müəllimlər"}
        secondPathname={"Tyutorlar"}
      />

      <TeachersData getNextTeachers={getNextTeachers} userData={userData} />
    </div>
  );
};

export default TeachersPage;
