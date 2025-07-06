import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateConsultationAction,
  createConsultationAction,
} from "../../../../../redux/actions/consultationsActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { consultationModalLoading: modalLoading } = useSelector(
    (state) => state.consultationModal
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
      type: SEARCH_VALUES_ACTION_TYPES.WORKERS_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      dispatch(
        updateConsultationAction(modalData?._id, {
          ...modalData,
          course: modalData?.course?._id,
          teacher: modalData?.teacher?._id,
        })
      );
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.WORKERS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createConsultationAction({
          ...modalData,
          course: modalData?.course?._id,
          teacher: modalData?.teacher?._id,
        })
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (Object.keys(formik.errors).length === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid) {
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
        <button disabled={isDisabled || modalLoading} onClick={dataCreate}>
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
