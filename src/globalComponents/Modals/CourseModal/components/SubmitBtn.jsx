import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_VALUES_ACTION_TYPES,
} from "../../../../redux/actions-type";
import {
  createCoursesAction,
  updateCoursesAction,
} from "../../../../redux/actions/coursesActions";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({ formik, modalData, funcType }) {
  const dispatch = useDispatch();
  const { coursesModalLoading } = useSelector((state) => state.coursesModal);
  const classCreate = () => {
    if (modalData?._id) {
      dispatch(updateCoursesAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.COURSES_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createCoursesAction(modalData));
    }
  };
  return (
    <div className="create-update-modal-btn">
      <button
        disabled={
          !(formik.isValid && modalData?.name && !coursesModalLoading)
        }
        onClick={classCreate}
      >
        {coursesModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
}
