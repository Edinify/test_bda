import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCareerAction,
} from "../../../../../redux/actions/careerActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { careerModalLoading: modalLoading } = useSelector(
    (state) => state.careerModal
  );

  const { lastPage } = useSelector((state) => state.careerPagination);
  const { careerSearchValues } = useSelector((state) => state.searchValues);

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const dataCreate = () => {
    dispatch(updateCareerAction(modalData, lastPage, careerSearchValues));
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (Object.keys(formik.errors).length === 0 && modalData?.fullName) {
          // // console.log(1);
          return false;
        } else if (
          Object.keys(formik.errors).length === 1 &&
          formik.errors.password === "Bu xana tələb olunur."
        ) {
          // // console.log(2);
          return false;
        } else {
          // // console.log(3);
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
