import React from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  updateWhereComing,
  createWhereComing,
} from "../../../../redux/actions/whereHeardActions";

export default function SubmitBtn({ formik, modalData, funcType }) {
  const dispatch = useDispatch();
  const { whereHeardModalLoading } = useSelector(
    (state) => state.whereHeardModal
  );
  const classCreate = () => {
    if (modalData?._id) {
      dispatch(updateWhereComing(modalData?._id, modalData));
    } else {
      dispatch(createWhereComing(modalData));
    }
  };
  return (
    <div className="create-update-modal-btn">
      <button
        disabled={
          !(
            formik.isValid &&
            modalData?.name &&
            modalData?.desc &&
            !whereHeardModalLoading
          )
        }
        onClick={classCreate}
      >
        {whereHeardModalLoading ? (
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
