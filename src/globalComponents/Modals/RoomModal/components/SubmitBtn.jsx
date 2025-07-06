import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../redux/actions-type";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  createRoomAction,
  updateRoomAction,
} from "../../../../redux/actions/roomsActions";

export default function SubmitBtn({ formik, modalData, funcType }) {
  const dispatch = useDispatch();
  const { roomsModalLoading } = useSelector((state) => state.roomsModal);
  const createRoom = () => {
    if (modalData?._id) {
      dispatch(updateRoomAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.ROOMS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createRoomAction(modalData));
    }
  };

  console.log(roomsModalLoading, "rooms modal loading");
  return (
    <div className="create-update-modal-btn">
      <button
        disabled={!(formik.isValid && modalData?.name && !roomsModalLoading)}
        onClick={createRoom}
      >
        {roomsModalLoading ? (
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
