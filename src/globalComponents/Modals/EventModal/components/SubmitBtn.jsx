import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../redux/actions-type";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  createEventAction,
  updateEventAction,
} from "../../../../redux/actions/eventsActions";

export default function SubmitBtn({ formik, modalData, funcType }) {
  const dispatch = useDispatch();
  const { eventsModalLoading } = useSelector((state) => state.eventModal);

  const classCreate = () => {
    if (modalData?._id) {
      dispatch(updateEventAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.EVENTS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createEventAction(modalData));
    }
  };
  return (
    <div className="create-update-modal-btn">
      <button
        disabled={!formik.isValid && !eventsModalLoading}
        onClick={classCreate}
      >
        {eventsModalLoading ? (
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
