import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWorkerAction,
  createWorkerAction,
} from "../../../../../redux/actions/workersActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { workerModalLoading: modalLoading } = useSelector(
    (state) => state.workerModal
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
      dispatch(updateWorkerAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.WORKERS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createWorkerAction({
          ...modalData,
        })
      );
    }
  };

  useEffect(() => {
    // // console.log(formik.errors, "formik errors");
    setIsDisabled(() => {
      if (funcType === "update") {
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
