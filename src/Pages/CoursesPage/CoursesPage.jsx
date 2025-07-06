import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSES_MODAL_ACTION_TYPE,
  COURSES_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import { getCoursesPaginationAction } from "../../redux/actions/coursesActions";
import CoursesData from "./components/CoursesData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";

const CoursePage = () => {
  const dispatch = useDispatch();
  const { courses, totalLength, loading } = useSelector(
    (state) => state.coursesPagination
  );
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const { user } = useSelector((state) => state.user);

  const openModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  // ============

  const getNextCourse = () => {
    if (loading) return;

    if (coursesSearchValues) {
      dispatch(
        getCoursesPaginationAction(courses?.length || 0, coursesSearchValues)
      );
    } else {
      dispatch(getCoursesPaginationAction(courses?.length || 0, ""));
    }
  };

  // ========

  const searchData = (e) => {
    e.preventDefault();
    dispatch({
      type: COURSES_ALL_ACTIONS_TYPE.RESET_COURSES_PAGINATION,
    });

    dispatch(getCoursesPaginationAction(0, coursesSearchValues));
  };

  useEffect(() => {
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(0, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(0, ""));
    }

    return () => {
      dispatch({
        type: COURSES_ALL_ACTIONS_TYPE.RESET_COURSES_PAGINATION,
      });
    };
  }, []);

  return (
    <div className="details-page courses ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"COURSES_SEARCH_VALUE"}
        dataSearchValues={coursesSearchValues}
        profile="courses"
        statusType={'course'}
        count={totalLength}
      />

      <CoursesData userData={user} getNextCourse={getNextCourse} />
    </div>
  );
};

export default CoursePage;
