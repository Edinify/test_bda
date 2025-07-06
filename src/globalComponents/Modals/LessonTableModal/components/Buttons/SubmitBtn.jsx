import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLessonTableAction,
  createLessonTableAction,
} from "../../../../../redux/actions/lessonTableActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { lessonTableModalLoading: modalLoading } = useSelector(
    (state) => state.lessonTableModal
  );
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });

  const dataCreate = () => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.LESSON_TABLE_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      dispatch(updateLessonTableAction(modalData?._id, modalData));
    } else {
      dispatch(createLessonTableAction(modalData));
    }
  };

  useEffect(() => {
    // // console.log(funcType, "func type");
    setIsDisabled(() => {
      if (funcType === "update") {
        // // console.log(formik.isValid, "formik is valid");
        // // console.log(formik.errors, "formik ERRROR");
        // // console.log(modalData);
        if (Object.keys(formik.errors).length === 0) {
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
        // // console.log(formik.isValid, "formik is valid");
        // // console.log(formik.errors, "formik ERRROR");
        // // console.log(modalData);
        if (formik.isValid) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);

  // // console.log(isDisabled, "modal loading");

  return (
    <>
      <div className="create-update-modal-btn">
        <button disabled={isDisabled} onClick={dataCreate}>
          {modalLoading ? (
            <LoadingBtn />
          ) : funcType === "update" ? (
            "Yenilə"
          ) : (
            "Yarat"
          )}
        </button>
      </div>
    </>
  );
};

export default SubmitBtn;
