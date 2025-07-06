import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSyllabusAction,
  createSyllabusAction,
} from "../../../../../redux/actions/syllabusActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { syllabusModalLoading: modalLoading } = useSelector(
    (state) => state.syllabusModal
  );
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const dataCreate = () => {
    // // console.log(true)
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.SYLLABUS_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      dispatch(
        updateSyllabusAction(modalData?._id, {
          ...modalData,
          courseId: selectedCourse._id,
        })
      );
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.SYLLABUS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createSyllabusAction({ ...modalData, courseId: selectedCourse._id })
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (Object.keys(formik.errors).length === 0 && modalData?.name) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && modalData?.name) {
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
        <button disabled={isDisabled || modalLoading || !selectedCourse} onClick={dataCreate}>
          {modalLoading ? (
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
