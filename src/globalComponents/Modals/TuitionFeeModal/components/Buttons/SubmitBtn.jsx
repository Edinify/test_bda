import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudentsAction,
  createStudentsAction,
} from "../../../../../redux/actions/studentsActions";
import { SEARCH_VALUES_ACTION_TYPES} from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { studentsModalLoading } = useSelector((state) => state.studentsModal);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const studentCreate = () => {
    if (modalData?._id) {
      dispatch(updateStudentsAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.STUDENTS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createStudentsAction({
          ...modalData,
        })
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (
          Object.keys(formik.errors).length === 0 &&
          modalData?.fullName
        ) {
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
    <div className="create-update-modal-btn">
      <button disabled={isDisabled || studentsModalLoading} onClick={studentCreate}>
        {studentsModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
};

export default SubmitBtn;
