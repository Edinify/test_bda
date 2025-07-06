import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSyllabusPaginationAction } from "../../redux/actions/syllabusActions";
import {
  SYLLABUS_MODAL_ACTION_TYPE,
  SYLLABUS_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import SyllabusData from "./components/SyllabusData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { toast } from "react-toastify";

const SyllabusPage = () => {
  const dispatch = useDispatch();
  const { totalLength, loading, syllabusData } = useSelector(
    (state) => state.syllabusPagination
  );
  const { syllabusSearchValues } = useSelector((state) => state.searchValues);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);

  let userData = JSON.parse(localStorage.getItem("userData"));
  userData =
    userData.role !== "super-admin"
      ? userData.profiles
      : JSON.parse(localStorage.getItem("userData"));

  const getNextSyllabus = () => {
    if (loading) return;

    if (syllabusSearchValues) {
      dispatch(
        getSyllabusPaginationAction(
          syllabusData?.length || 0,
          syllabusSearchValues,
          selectedCourse._id
        )
      );
    } else {
      dispatch(
        getSyllabusPaginationAction(
          syllabusData?.length || 0,
          "",
          selectedCourse._id
        )
      );
    }
  };

  const openModal = () => {
    if (selectedCourse) {
      dispatch({
        type: SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL,
        payload: { data: {}, openModal: true },
      });
    } else {
      toast.error("İxtisas seçməlisiniz", {
        position: "top-right",
        autoClose: 2000,
        toastClassName: "custom-toast",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const searchData = (e) => {
    e.preventDefault();

    dispatch({ type: SYLLABUS_ALL_ACTIONS_TYPE.RESET_SYLLABUS_PAGINATION });

    if (selectedCourse?._id) {
      dispatch(
        getSyllabusPaginationAction(0, syllabusSearchValues, selectedCourse._id)
      );
    } else {
      toast.error("İxtisas seçməlisiniz", {
        position: "top-right",
        autoClose: 2000,
        toastClassName: "custom-toast",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    // console.log(selectedCourse._id);
    if (syllabusSearchValues) {
      dispatch(getSyllabusPaginationAction(0, syllabusSearchValues, ""));
    } else if (selectedCourse._id) {
      dispatch(getSyllabusPaginationAction(0, "", ""));
    }

    return () => {
      dispatch({
        type: SYLLABUS_ALL_ACTIONS_TYPE.RESET_SYLLABUS_PAGINATION,
      });
    };
  }, []);
  return (
    <div className="details-page teachers-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"SYLLABUS_SEARCH_VALUE"}
        dataSearchValues={syllabusSearchValues}
        statusType="syllabus"
        count={totalLength}
      />

      <SyllabusData
        getNextSyllabus={getNextSyllabus}
        userData={userData}
        selectedCourse={selectedCourse}
      />
    </div>
  );
};

export default SyllabusPage;
