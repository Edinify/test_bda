import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  createLeadAction,
  updateLeadAction,
} from "../../../../../redux/actions/leadActions";

export default function SubmitBtn({
  formik,
  funcType,
  leadModalData,
}) {
  const dispatch = useDispatch();
  const { leadModalLoading } = useSelector((state) => state.leadModal);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });



  const incomesCreate = () => {
    if (leadModalData?._id) {
      dispatch(updateLeadAction(leadModalData?._id, leadModalData));
    } else {
      dispatch(createLeadAction({ ...leadModalData }));
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        // // console.log(Object.keys(formik.errors).length > 0);
        if (Object.keys(formik.errors).length > 0) {
          return true;
        } else {
          return false;
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
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button
            disabled={isDisabled || leadModalLoading}
            onClick={incomesCreate}
          >
            {leadModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
        </div>
      ) : (
        <div className="create-update-modal-btn">
          <button
            disabled={isDisabled || leadModalLoading}
            onClick={incomesCreate}
          >
            {leadModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
