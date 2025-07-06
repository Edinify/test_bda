import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTeacherAction,
  createTeacherAction,
} from "../../../../../redux/actions/teachersActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { useLocation } from "react-router-dom";

const SubmitBtn = ({ formik, modalData, funcType, closeModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // // console.log(location.pathname, "locatiooooooooooooooooooooooooooonnn");

  const { teachersModalLoading } = useSelector((state) => state.teachersModal);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const teacherCreate = () => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.TEACHERS_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      const courses = modalData?.courses.map((item) => {
        return item._id;
      });
      dispatch(
        updateTeacherAction(modalData?._id, { ...modalData, courses: courses })
      );
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.TEACHERS_SEARCH_VALUE,
        payload: "",
      });
      const courses = modalData?.courses.map((item) => {
        return item._id;
      });
      dispatch(
        createTeacherAction(
          { ...modalData, courses: courses },
          location.pathname
        )
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (Object.keys(formik.errors).length === 0 && modalData?.fullName) {
          return false;
        } else if (
          Object.keys(formik.errors).length === 1 &&
          formik.errors.password === "Bu xana tələb olunur."
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && modalData?.fullName) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);
  return (
    <div>
      <div className="create-update-modal-btn">
        <button
          disabled={isDisabled || teachersModalLoading}
          onClick={teacherCreate}
        >
          {teachersModalLoading ? (
            <LoadingBtn />
          ) : funcType === "update" ? (
            "Yenilə"
          ) : (
            "Yarat"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubmitBtn;
